<?php


namespace App\Utils;

use Carbon\Carbon;

class SqlUtil
{
    public function setStringFromArray($datas) {
        $str = '';
        foreach($datas as $dat) {
            $str .= '\''. $dat .'\',';
        }
        $str = substr($str, 0, -1);
        return $str;
    }

    public function setTimeWithoutSecond($strTime) {
        $result = $strTime;
        if(isset($strTime) && !empty($strTime)) {
            $split = explode(':', $strTime);
            $result = $split[0] .':'.$split[1];
        }
        return $result;
    }

    public function generateDateField( $cond) {
        $operator = self::OPERATOR[$cond['cond']];
        if ($operator === 'is null' || $operator === 'is not null') {
            $value = '';
            $conditions ='('. "DATE_FORMAT({$cond['field']},'%Y-%m-%d %H:%i') {$operator} DATE_FORMAT({$value},'%Y-%m-%d %H:%i')" . ')';
        } else if ($operator === 'between' && is_array($cond['value'])){
            $conditions ='('. "DATE_FORMAT({$cond['field']}, '%Y-%m-%d %H:%i') BETWEEN  DATE_FORMAT('{$this->getDateString($cond['value'][0])}','%Y-%m-%d %H:%i') AND DATE_FORMAT('{$this->getDateString($cond['value'][1])}','%Y-%m-%d %H:%i')" . ')';
        }
        else {
            $conditions = '('. "DATE_FORMAT({$cond['field']},'%Y-%m-%d %H:%i') {$operator} DATE_FORMAT('{$this->getDateString($cond['value'])}','%Y-%m-%d %H:%i')" . ')';
        }
        return $conditions;
    }

    public function generateNormalField($cond) {
        $operator = self::OPERATOR[$cond['cond']];
        if (in_array($operator, ['like', 'not like'])) {
            $value = "'%{$cond['value']}%'" ;
        } else if (in_array($operator, ['in', 'not in']) && count($cond['value']) > 0) {
            $value = '';
            foreach($cond['value'] as $val) {
                $value .= "'{$val}',";
            }
            $value = substr($value, 0, -1);
            $value = '(' . $value . ')';
        } else if ($operator === 'is null' || $operator === 'is not null') {
            $value = '';
        } else if ($operator === 'between' && is_array($cond['value'])){
            $value = "'{$cond['value'][0]}' AND '{$cond['value'][1]}'";
        } else {
            $value = is_string($cond['value']) ? "'{$cond['value']}'" : $cond['value'];
        }
        return '('. "{$cond['field']} {$operator} {$value}" . ')';
    }

    public function getDateString($val) {
        try {
            if(str_contains($val, '/')){
                $format = $this->getFormatDate($val);
                $d = Carbon::createFromFormat($format['format'], $val);
                switch ($format['type']) {
                    case 2:
                        return $d->startOfSecond()->toDateTimeString();
                    case 3:
                        return $d->startOfDay()->toDateTimeString();
                    default:
                        return $d->toDateTimeString();
                }
            }
            return $val;
        } catch(\Exception $e) {
            return Carbon::now()->toDateTimeString();
        }
    }

    public function getFormatDate($date) {
        $split = explode(':', $date);
        if(count($split) > 2){
            return [
                'type' => 1,
                'format' => 'd/m/Y H:i:s'
            ];
        } else if(count($split) > 1) {
            return [
                'type' => 2,
                'format' => 'd/m/Y H:i'
            ];
        } else {
            return [
                'type' => 3,
                'format' => 'd/m/Y'
            ];
        }
    }

    const OPERATOR = [
        'is' => '=',
        'not' => '!=',
        'lt' => '<',
        'gt' => '>',
        'lte' => '<=',
        'gte' => '>=',
        'between' => 'between',
        'include' => 'like',
        'not_include' => 'not like',
        'is_not_null' => 'is not null',
        'is_null' => 'is null',
        'in' => 'in',
        'not_in' => 'not in',
    ];
}
