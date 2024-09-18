<?php


namespace App\Services;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Services\Base\BaseService;

class CategoryService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        CategoryRepositoryInterface $repo_base,
    )
    {
        $this->repo_base = $repo_base;
        $this->with = [];
        parent::__construct();
    }

    public function getModelName()
    {
        return 'categories';
    }

    public function getTableName()
    {
        return (new Category())->getTable();
    }

    public function getJoinTable()
    {
        return [];
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
        ];
    }

    public function generateColumn($inputs, $columns)
    {
        if (isset($inputs['name']) && $inputs['name'] !== 'all') {
            array_push($columns, "users.name = '" . $inputs['name'] . "'");
        }
        // if (isset($inputs['role']) && $inputs['role'] !== 'all') {
        //     array_push($columns, "users.role = '" . $inputs['role'] . "'");
        // }
        // if (isset($inputs['status']) && $inputs['status'] !== 'all') {
        //     array_push($columns, "users.status = '" . $inputs['status'] . "'");
        // }
        // if (isset($inputs['username']) && $inputs['username'] !== 'all') {
        //     array_push($columns, "users.username = '" . $inputs['username'] . "'");
        // }
        // if (isset($inputs['phone']) && $inputs['phone'] !== 'all') {
        //     array_push($columns, "users.phone = '" . $inputs['phone'] . "'");
        // }
        // if (isset($inputs['domain_name']) && $inputs['domain_name'] !== 'all') {
        //     array_push($columns, "users.domain_name = '" . $inputs['domain_name'] . "'");
        // }
        // if (isset($inputs['email']) && $inputs['email'] !== 'all') {
        //     array_push($columns, "users.email = '" . $inputs['email'] . "'");
        // }
        return $columns;
    }

    public function getIndexName()
    {
        return (new Category())->searchableAs();
    }
}
