---
title: Seeding a MySQL 8 table with geographic coordinates using Laravel
description: Who would expect there’s a SQL column type for this?
tags: laravel, sql, mysql, seeding data, geographic coordinates
publishedAt: 2024-05-10
outline: [2, 3]
---

Today I learned that MySQL 8 has column types to store geographic coordinates, the simplest of them probably being [`POINT`](https://dev.mysql.com/doc/refman/8.3/en/gis-point-property-functions.html). It’s less straightforward than what I expected, so here’s how I managed to seed my database using [Laravel](https://laravel.com).

---

# Seeding a MySQL 8 table with geographic coordinates using Laravel 11

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>
<tags/>

Stack for this post:
- Laravel 11.5.0
- PHP 8.3.6
- MySQL 8.1

::: details Solution without explanation

::: code-group

```php{18} [2024_05_09_193405_create_places_table.php]
<?php

use Database\Seeders\PlacesSeeder;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->geography('coordinates', 'point');
        });

        (new PlacesSeeder())->run();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('places');
    }
};
```

```php{17} [PlacesSeeder.php]
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlacesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $montgomery = [
            'name' => 'MONTGOMERY',
            'coordinates' => DB::raw('ST_SRID(Point(50.838006, 4.40897), 4326)'),
        ];

        DB::table('places')->insert([$mongtomery]);
    }
}
```

:::

## Coordinates in the database, why?

Among [all MySQL spatial functions](https://dev.mysql.com/doc/refman/8.3/en/spatial-function-reference.html), [a bunch of them support computations](https://dev.mysql.com/blog-archive/geography-in-mysql-8-0/), which might be handy in some scenarios. I absolutely don’t need this for now and I could as well use a [`JSON` type](https://dev.mysql.com/doc/refman/8.3/en/json.html) or a [`VARCHAR`](https://dev.mysql.com/doc/refman/8.3/en/char.html) to store the latitude and longitude of a place, but I gave it a try since I like to express data in a meaningful way, and for science’s sake!

## Create a field for coordinates in a Laravel migration

In Laravel, you can use the [`geography` column type](https://laravel.com/docs/11.x/migrations#column-method-geography) to declare a [`POINT`](https://dev.mysql.com/doc/refman/8.3/en/spatial-type-overview.html) in your table [migration](https://laravel.com/docs/11.x/migrations#introduction):

```php{4}
Schema::create('places', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->geography('coordinates', 'point');
});
```

The actual SQL query ran by this migration:

```sql{4}
CREATE TABLE `places` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `coordinates` point /*!80003 SRID 4326 */ NOT NULL,
  PRIMARY KEY (`id`)
);
```

The comment in the `coordinates` field shows it uses a [`SRID`](https://en.wikipedia.org/wiki/Spatial_reference_system) of [`4326`](https://developers.arcgis.com/documentation/spatial-references/#4326---gps), which is one of the most common ways to project spatial data on a 2D map. It seems that’s what SRID are all about.

## Insert geographic coordinates in a table

Let’s see how to store an entry containing geographic coordinates, first using plain SQL, then using Laravel.

### Insert geographic coordinates using plain SQL

You might think it’s straightforward to insert an entry in this table using the [`Point`](https://dev.mysql.com/doc/refman/8.3/en/gis-mysql-specific-functions.html#function_point) MySQL function:

```sql
INSERT INTO `places` (`name`, `coordinates`)
VALUES
	('MONTGOMERY', Point(50.838006, 4.40897))
```

But this query actually fails and throws:

> The SRID of the geometry does not match the SRID of the column 'coordinates'. The SRID of the geometry is 0, but the SRID of the column is 4326. Consider changing the SRID of the geometry or the SRID property of the column.

We need to attach a SRID to that point, using the [`ST_SRID` function](https://dev.mysql.com/doc/refman/8.3/en/gis-general-property-functions.html#function_st-srid):

```sql
INSERT INTO `places` (`name`, `coordinates`)
VALUES
	('MONTGOMERY', Point(50.838006, 4.40897)) # [!code --]
	('MONTGOMERY', ST_SRID(Point(50.838006, 4.40897), 4326)) # [!code ++]
```

Now it works, and our table entry contains `POINT(50.838006 4.40897),4326` in `coordinates`.

### Insert geographic coordinates using Laravel `DB`

::: info
For now I have not tried with [Eloquent](https://laravel.com/docs/11.x/eloquent#inserting-and-updating-models) yet. Feel free to reach out if you have! I’ll update the article with your findings.
:::

In Laravel, I initially thought this would work:

```php{3}
$montgomery = [
    'name' => 'MONTGOMERY',
    'coordinates' => 'ST_SRID(Point(50.838006, 4.40897), 4326)',
];

DB::table('places')->insert([$mongtomery]);
```

But unlike the previous plain SQL request, it fails:

> SQLSTATE[22003]: Numeric value out of range: 1416 Cannot get geometry object from data you send to the GEOMETRY field

This is a bit unexpected, so let’s debug! We can inspect the generated SQL query with the undocumented [`DB::pretend` method](https://laravel.com/api/11.x/Illuminate/Database/Connection.html#method_pretend):

```php
dd(DB::pretend(fn() => DB::table('places')->insert([$mongtomery])));
```

We see the `ST_SRID` function is now unfortunately wrapped by quotes, it’s why it fails.

```sql{3}
INSERT INTO `places` (`coordinates`, `name`)
VALUES
    ('ST_SRID(Point(50.838006, 4.40897), 4326)', 'MONTGOMERY')
```

To work around this, we need to prepare the SQL statement using [`DB::raw`](https://laravel.com/docs/11.x/queries#raw-expressions) :

```php
$montgomery = [
    'name' => 'MONTGOMERY',
    'coordinates' => 'ST_SRID(Point(50.838006, 4.40897), 4326)', // [!code --]
    'coordinates' => DB::raw('ST_SRID(Point(50.838006, 4.40897), 4326)'), // [!code ++]
];

DB::table('places')->insert([$mongtomery]);
```

With this change, the generated SQL query is now correct. 👍

It’s somehow weird that Laravel provides a convenient way to create a spatial database column but absolute nothing when it comes to actually dealing with related read-write operations. On the other hand, looking at the spatial specifics (number of possibilities, functions and database engines), it’s probably wiser to keep this out the scope of the framework.

::: danger MySQL is not the only database system.
In Laravel, there are [multiple drivers for various database systems](https://laravel.com/docs/11.x/database#introduction). MySQL is only one of them, and others might not support the same spatial features and functions, so make sure you properly document the supported database of your project. Alternatively, there are probably interesting bits of code in [angel-source-labs/laravel-spatial](https://github.com/Angel-Source-Labs/laravel-spatial) if you want to implement bridges/helpers between database systems. If you know a well-maintained package for this, let me know, I’ll put it here.
:::
