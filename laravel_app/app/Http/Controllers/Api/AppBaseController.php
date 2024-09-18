<?php

namespace App\Http\Controllers\API;

use App\Utils\AppBaseResponse;
use App\Utils\LogHelper;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Response;

class AppBaseController extends BaseController
{
    protected $action_type;

    public function sendResponse($result, $message)
    {
        return AppBaseResponse::makeResponse($message, $result);
    }

    public function sendError($error, $code = 404)
    {
        return AppBaseResponse::makeErrorResponse($error, $code);
    }

    public function sendErrorData($data, $error, $code = 404)
    {
        return AppBaseResponse::makeErrorDataResponse($error, $data, $code);
    }

    public function callAction($method, $params)
    {
        if($this->contains($method, ['find', 'search', 'getAll', 'getDict'])) {
            return $this->callActionWithoutTransaction($method, $params);
        }
        return $this->callActionWithTransaction($method, $params);
    }

    protected function callActionWithoutTransaction($method, $params) {
        $ajax = request()->ajax();
        try {
            $data = parent::callAction($method, $params);
            if(isset($data['code']) && $data['code'] === '200'){
                $this->writeLog($method, $data);
            }
            return $data;
        } catch(ValidationException $exception) {
            return $this->handleValidationException($exception, $ajax);
        } catch(AuthenticationException $exception) {
            return $this->handleAuthException($exception, $ajax);
        } catch(\Exception $e){
            return $this->handleException($e, $ajax);
        }
    }

    protected function callActionWithTransaction($method, $params) {
        $ajax = request()->ajax();
        try {
            DB::beginTransaction();
            $data = parent::callAction($method, $params);
            if(isset($data['code']) && $data['code'] != '200'){
                if(isset($data['is_rollback'])){
                    if($data['is_rollback']){
                        DB::rollBack();
                    }
                } else {
                    DB::rollBack();
                }
            } else {
                $this->writeLog($method, $data);
                DB::commit();
            }
            return $data;
        } catch(ValidationException $exception) {
            DB::rollBack();
            return $this->handleValidationException($exception, $ajax);
        } catch(AuthenticationException $exception) {
            DB::rollBack();
            return $this->handleAuthException($exception, $ajax);
        } catch(\Exception $e){
            DB::rollBack();
            return $this->handleException($e, $ajax);
        }
    }

    protected function handleValidationException(ValidationException $exception, $ajax = false)
    {
        $tracking_id = LogHelper::writeLog('issued on '
            . 'Url: ' . request()->path() . ' - '
            . 'Request: ' . json_encode(request()->all(), JSON_UNESCAPED_UNICODE) . ' - '
            . 'Trace: ' . json_encode($exception->getTrace(), JSON_UNESCAPED_UNICODE), 0);
        if($ajax) {
            return response()->json(
                [
                    'error' => 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau ('. $tracking_id .')'
                ], 422
            );
        } else {
            return redirect()->back()->withInput()->withErrors([['error' => 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau']]);
        }
    }

    protected function handleAuthException(AuthenticationException $exception, $ajax = false)
    {
        $tracking_id = LogHelper::writeLog('issued on authorization '
            . 'Url: ' . request()->path() . ' - '
            . 'Request: ' . json_encode(request()->all(), JSON_UNESCAPED_UNICODE) . ' - '
            . 'Trace: ' . json_encode($exception->getTrace(), JSON_UNESCAPED_UNICODE), 0);
        if($ajax) {
            return response()->json(array('error' => 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau ('. $tracking_id .')'), 403);
        } else {
            App::abort(403);
        }
    }

    protected function handleException(\Exception $exception, $ajax = false)
    {
//        $tracking_id = LogHelper::writeLog('issued on exception ' . $exception->getMessage(), 0);
        $tracking_id = LogHelper::writeLog('issued on exception '
            . 'Url: ' . request()->path() . ' - '
            . 'Request: ' . json_encode(request()->all(), JSON_UNESCAPED_UNICODE) . ' - '
            . 'Trace: ' . json_encode($exception->getTrace(), JSON_UNESCAPED_UNICODE), 0);
        if($ajax) {
            return response()->json($exception->getMessage(), 200);
        } else {
            $message = $exception->getMessage();
            if(config('constants.debug') === 0){
                $message = 'Có lỗi xảy ra trong hệ thống. Vui lòng thử lại sau ('. $tracking_id .')';
            }
            $res = [
                'success' => false,
                'error' => $message,
                'code' => 999
            ];
            return response()->json($res, 200);
        }
    }

    protected function writeLog($method, $data){
        if(isset($this->action_type)){
//            if($method == 'store'){
//                EmployeeLog::createLog($data['data'], $this->action_type, 1);
//            } else if($method == 'update' || $method == 'updateStatus' || $method == 'updateProfile'){
//                EmployeeLog::createLog($data['data'], $this->action_type, 2);
//            } else if($method == 'confirm') {
//                EmployeeLog::createLog($data['data'], $this->action_type, 4);
//            } else if($method == 'login' || $method == 'loginMobile' || $method == 'loginToken' || $method == 'loginTokenMobile') {
//                EmployeeLog::createLog($data['data'], 0, 0);
//            } // case order
//            else if($method == 'notifyKitchen' || $method == 'removeProduct') {
//                if($method == 'removeProduct'){
//                    EmployeeLog::createLog($data['data'], $this->action_type, 5);
//                } else {
//                    if(request()->has('order_id')){
//                        EmployeeLog::createLog($data['data'], $this->action_type, 2);
//                    } else {
//                        EmployeeLog::createLog($data['data'], $this->action_type, 1);
//                    }
//                }
//            }
        }
    }

    private function contains($str, array $arr)
    {
        foreach($arr as $a) {
            if (str_contains($str, $a)) {
                return true;
            }
        }
        return false;
    }
}
