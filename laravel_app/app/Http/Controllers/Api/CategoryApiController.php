<?php


namespace App\Http\Controllers\API;

use App\Services\CategoryService;

class CategoryApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(
        CategoryService $service_base
    )
    {
        $this->service_base         = $service_base;
    }
}
