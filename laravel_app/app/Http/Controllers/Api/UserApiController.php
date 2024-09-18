<?php


namespace App\Http\Controllers\API;

use App\Services\UserService;
use Illuminate\Http\Request;

class UserApiController extends BaseApiController
{
    protected $service_base;

    public function __construct(
        UserService $service_base
    )
    {
        $this->service_base         = $service_base;
    }

    public function login(Request $request) {
        $res = $this->service_base->login($request->all());
        if($res['code'] != '200') {
            return $this->sendError($res['message'], $res['code']);
        }
        return $this->sendResponse($res['data'], 'login success');
    }

    public function loginWithToken() {
        $res = $this->service_base->loginWithToken();
        return $this->sendResponse($res['data'], 'login with token success');
    }

    public function storeApp(Request $request)
    {
      $res = $this->service_base->storeApp($request->all());
      if($res['code'] != '200') {
        return $this->sendError($res['message'], $res['code']);
      }
      return $this->sendResponse($res['data'], 'Store success');
    }

    public function searchApp(Request $request)
    {
        $res = $this->service_base->searchApp($request->all());
        if($res['code'] != '200') {
            return $this->sendError($res['message'], $res['code']);
        }
        return $this->sendResponse($res['data'], 'Search success');
    }
}
