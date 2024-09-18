<?php


namespace App\Services;

use App\Models\Product;
use App\Repositories\Interfaces\ProductRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;

class ProductService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        ProductRepositoryInterface $repo_base,
    ) {
        $this->repo_base = $repo_base;
        $this->with = ['category'];
        // $this->with = [];
        $this->is_app = false;
    }

    public function getModelName()
    {
        return 'products';
    }

    public function getTableName()
    {
        return (new Product())->getTable();
    }

    public function getJoinTable()
    {
        return [
            [
                'join' => 'leftJoin',
                'join_table' => 'categories',
                'join_column' => 'categories.id',
                'join_cond' => '=',
                'main_column' => $this->getTableName() . '.category_id',
                'where' => [
                    // 'vehicles.deleted_at is null'
                ],
            ],

        ];
    }

    public function getQueryDateField()
    {
        return [
            $this->getTableName() . '.created_at',
            $this->getTableName() . '.updated_at',
        ];
    }

    public function getQueryField()
    {
        return [
            $this->getTableName() . '.name',
            $this->getTableName() . '.description',
            $this->getTableName() . '.status',
            'categories.name',
        ];
    }

    public function generateColumn($inputs, $columns)
    {
        if (isset($inputs['name']) && $inputs['name'] !== 'all') {
            $columns[] =  'categories.name = "' . $inputs['name'] . '"';
        }
        if (isset($inputs['name']) && $inputs['name'] !== 'all') {
            $columns[] = $this->getTableName() . '.name = "' . $inputs['name'] . '"';
        }
        if (isset($inputs['description']) && $inputs['description'] !== 'all') {
            $columns[] = $this->getTableName() . '.description = "' . $inputs['description'] . '"';
        }
        if (isset($inputs['status']) && $inputs['status'] !== 'all') {
            $columns[] = $this->getTableName() . '.status = "' . $inputs['status'] . '"';
        }
        return $columns;
    }


    public function formatDataCms($data){
        $res = json_decode($data, true);
        if(isset($data->category)){
            $res['category_name'] = $data->category->name;
        }
        return $res;
    }
}
