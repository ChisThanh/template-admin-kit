<?php


namespace App\Services;

use App\Models\User;
use App\Repositories\Interfaces\UserRepositoryInterface;
use App\Services\Base\BaseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

class UserService extends BaseService
{
    protected $repo_base;
    protected $with;

    public function __construct(
        UserRepositoryInterface $repo_base
    ) {
        $this->repo_base = $repo_base;
        $this->with = [];
        $this->is_app = false;
    }

    public function getModelName()
    {
        return 'users';
    }

    public function getTableName()
    {
        return (new User())->getTable();
    }

    // public function searchApp($inputs)
    // {
    //     if (!isset($inputs['filter'])) {
    //         $inputs['filter'] = [];
    //     }
    //     $inputs['filter']['role'] = 'club';
    //     $inputs['filter']['status'] = 2;
    //     return parent::search($inputs);
    // }

    // public function storeApp($inputs)
    // {
    //     // $this->is_app = true;
    //     return $this->store($inputs);
    // }

    // public function store($inputs)
    // {
    //     $res = parent::store($inputs);
    //     if ($res['code'] !== '200') {
    //         return $res;
    //     }

    //     return $res;
    // }

    // public function update($id, $inputs)
    // {
    //     $res = parent::update($id, $inputs);
    //     if ($res['code'] !== '200') {
    //         return $res;
    //     }

    //     return $res;
    // }
    // public function destroy($id)
    // {
    //     $user = $this->repo_base->findById($id);
    //     return parent::destroy($id);
    // }

    // public function login($inputs)
    // {
    //     if (!isset($inputs['email'])) {
    //         return ['code' => '003', 'message' => 'Tài khoản'];
    //     }
    //     if (!isset($inputs['password'])) {
    //         return ['code' => '003', 'message' => 'Mật khẩu'];
    //     }
    //     $user = $this->repo_base->findOneBy(['email' => $inputs['email']]);
    //     if (!isset($user)) {
    //         return ['code' => '004', 'message' => 'Tài khoản'];
    //     }

    //     if (!Hash::check($inputs['password'], $user->password)) {
    //         return ['code' => '002', 'message' => ''];
    //     }
    //     $device_name = env('APP_NAME');
    //     return [
    //         'code' => '200',
    //         'data' => [
    //             'user' => $user,
    //             'token' => $user->createToken($device_name, ['*'], now()->addMonths(2))->plainTextToken
    //         ]
    //     ];
    // }

    // public function loginWithToken()
    // {
    //     $user = auth()->user();
    //     return [
    //         'code' => '200',
    //         'data' => $user
    //     ];
    // }

    //     public function checkInputs($inputs, $id)
    //     {
    // //        $inputs['is_update'] = isset($inputs['is_update']) ? true : false;
    // //        if (!isset($inputs['username'])) {
    // //            return ['is_failed' => true, 'code' => '003', 'field_name' => 'username', 'message' => __("tên tài khoản")];
    // //        }
    // //        if (!isset($inputs['phone'])) {
    // //            return ['is_failed' => true, 'code' => '003', 'field_name' => 'phone', 'message' => __("số điện thoại")];
    // //        }
    // //        if (!preg_match('/^\+?\d{9,15}$/', $inputs['phone'])) {
    // //            return ['is_failed' => true, 'code' => '007', 'field_name' => 'phone', 'message' => __("Số điện thoại")];
    // //        }
    // //        if (!isset($inputs['domain_name'])) {
    // //            return ['is_failed' => true, 'code' => '003', 'field_name' => 'domain_name', 'message' => __("tên domain")];
    // //        }
    // //        // always lowcase domain
    // //        $inputs['domain_name'] = strtolower($inputs['domain_name']);
    // //
    // //        if (!isset($inputs['password']) && !$inputs['is_update']) {
    // //            return ['is_failed' => true, 'code' => '003', 'field_name' => 'password', 'message' => __("mật khẩu")];
    // //        }
    // //        if (!isset($inputs['limit_of_club'])) {
    // //            return ['is_failed' => true, 'code' => '003', 'field_name' => 'limit_of_club', 'message' => __("Số lượng giới hạn câu lạc bộ")];
    // //        }
    // //        // if (!isset($inputs['expired_at'])) {
    // //        //   return ['is_failed' => true, 'code' => '003', 'field_name' => 'expired_at', 'message' => __("Ngày hết hạn")];
    // //        // }
    // //        if ($this->repo_base->existByWhere(['username' => $inputs['username']], $id)) {
    // //            return ['is_failed' => true, 'code' => '005', 'field_name' => 'username', 'message' => __("Tên tài khoản")];
    // //        }
    // //        if ($this->repo_base->existByWhere(['phone' => $inputs['phone']], $id)) {
    // //            return ['is_failed' => true, 'code' => '005', 'field_name' => 'phone', 'message' => __("Số điện thoại")];
    // //        }
    // //        if ($this->repo_base->existByWhere(['domain_name' => $inputs['domain_name']], $id)) {
    // //            return ['is_failed' => true, 'code' => '005', 'field_name' => 'domain_name', 'message' => __("Tên domain")];
    // //        }
    //         if(isset($inputs['password'])) {
    //             $inputs['password'] = bcrypt($inputs['password']);
    //         }
    // //        if(!isset($inputs['expired_at'])) {
    // //            $inputs['expired_at'] = Carbon::now()->addMonths(3);
    // //        }

    //         return [
    //             'is_failed' => false,
    //             'inputs' => $inputs
    //         ];
    //     }

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
            $this->getTableName() . '.email',
        ];
    }

    public function generateColumn($inputs, $columns)
    {
        if (isset($inputs['name']) && $inputs['name'] !== 'all') {
            array_push($columns, "users.name = '" . $inputs['name'] . "'");
        }
        if (isset($inputs['email']) && $inputs['email'] !== 'all') {
            array_push($columns, "users.email = '" . $inputs['email'] . "'");
        }
        return $columns;
    }
}
