<?php


namespace App\Repositories;


use App\Models\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function getModel()
    {
        return Product::class;
    }
}
