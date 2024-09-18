<?php


namespace App\Services\Base;


use App\Utils\LogHelper;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Exception\ServerException;

class ClientServices
{
    protected $url;

    public function setUrl($url){
        $this->url = $url;
    }

    public function sendGet($inputs) {
        try {
            $client = new Client();
            $result = $client->get($this->url, $this->setOptions($inputs));
            return $this->getResponse($result);
        } catch (ClientException $e) {
            $tracking_id = LogHelper::writeLog('issued on client call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (ServerException $e) {
            $tracking_id = LogHelper::writeLog('issued on server response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (BadResponseException $e) {
            $tracking_id = LogHelper::writeLog('issued on bad response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (\Exception $e) {
            $tracking_id = LogHelper::writeLog('issued exception response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
    }

    public function sendDelete($inputs) {
        try {
            $client = new Client();
            $result = $client->delete($this->url, $this->setOptions($inputs));
            return $this->getResponse($result);
        } catch (ClientException $e) {
            $tracking_id = LogHelper::writeLog('issued on client call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (ServerException $e) {
            $tracking_id = LogHelper::writeLog('issued on server response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (BadResponseException $e) {
            $tracking_id = LogHelper::writeLog('issued on bad response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (\Exception $e) {
            $tracking_id = LogHelper::writeLog('issued exception response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
    }

    public function sendPut($inputs) {
        try {
            $client = new Client();
            $result = $client->put($this->url, $this->setOptions($inputs));
            return $this->getResponse($result);
        } catch (ClientException $e) {
            $tracking_id = LogHelper::writeLog('issued on client call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (ServerException $e) {
            $tracking_id = LogHelper::writeLog('issued on server response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (BadResponseException $e) {
            $tracking_id = LogHelper::writeLog('issued on bad response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (\Exception $e) {
            $tracking_id = LogHelper::writeLog('issued exception response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
    }


    public function sendPost($inputs){
        try {
            $client = new Client();
            $result = $client->post($this->url, $this->setOptions($inputs));
            return $this->getResponse($result);
        } catch (ClientException $e) {
            $tracking_id = LogHelper::writeLog('issued on client call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (ServerException $e) {
            $tracking_id = LogHelper::writeLog('issued on server response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (BadResponseException $e) {
            $tracking_id = LogHelper::writeLog('issued on bad response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
        catch (\Exception $e) {
            $tracking_id = LogHelper::writeLog('issued exception response call ' . $e->getMessage(), 0);
            return [
                'success' => false,
                //'code' => $e->getResponse()->getStatusCode(),
                'message' => $e->getMessage() . ' ('. $tracking_id .')',
                //'data' => $this->getResponse($e->getResponse())
            ];
        }
    }

    public function setOptions($inputs){
        $options = [];
        if(isset($inputs['header'])){
            $options['headers'] = $inputs['header'];
        }
        if(isset($inputs['body'])){
            $options['json'] = $inputs['body'];
        }
        if(isset($inputs['curl'])) {
            $options['curl'] = $inputs['curl'];
        }
        if(isset($inputs['auth'])) {
            $options['auth'] = $inputs['auth'];
        }
        if(isset($inputs['multipart'])) {
            $options['multipart'] = $inputs['multipart'];
        }
        if(isset($inputs['verify'])) {
            $options['verify'] = $inputs['verify'];
        }
        if(isset($inputs['form_params'])) {
            $options['form_params'] = $inputs['form_params'];
        }
        if(isset($inputs['query'])) {
            $options['query'] = $inputs['query'];
        }
        if(isset($inputs['timeout'])) {
            $options['timeout'] = $inputs['timeout'];
        }
        if(isset($inputs['connect_timeout'])) {
            $options['connect_timeout'] = $inputs['connect_timeout'];
        }
        return $options;
    }

    private function getResponse($result) {
        $res = $result->getBody()->getContents();
        return json_decode($res, true);
    }

    private function getResponseString($result) {
        $res = $result->getBody()->getContents();
        return $res;
    }
}
