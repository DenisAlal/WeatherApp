<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GetWeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $lat = $request->input('lat');
        $lon = $request->input('lon');
        $lang = $request->input('lang');
        $units = $request->input('units');
        $url = "http://api.openweathermap.org/data/2.5/forecast?lat=".$lat."&lon=".$lon."&units=".$units."&lang=".$lang."&appid=8c4d673ca47a9bd9ff436dcdee56e3bf";
        $client = new \GuzzleHttp\Client();
        $response = $client->post($url, [
            'verify' => false
        ]);

        if ($response->getStatusCode() == 200) {
            $data = json_decode($response->getBody()->getContents(), true);
            return response()->json([$data], 200);
        } else {
            $statusCode = $response->getStatusCode();
            $errorMessage = $response->getBody()->getContents();
            return response()->json([
                'message' => 'Ошибка запроса к API',
                'status' => $statusCode,
                'error' => $errorMessage,
            ], $statusCode);
        }
    }

    public function getWeatherFromName(Request $request)
    {
        $q = $request->input('q');
        $lang = $request->input('lang');
        $units = $request->input('units');
        $url = "http://api.openweathermap.org/data/2.5/forecast?q=".$q."&units=".$units."&lang=".$lang."&appid=8c4d673ca47a9bd9ff436dcdee56e3bf";
        $client = new \GuzzleHttp\Client();
        $response = $client->post($url, [
            'verify' => false
        ]);

        if ($response->getStatusCode() == 200) {
            $data = json_decode($response->getBody()->getContents(), true);
            return response()->json([$data], 200);
        } else {
            $statusCode = $response->getStatusCode();
            $errorMessage = $response->getBody()->getContents();
            return response()->json([
                'message' => 'Ошибка запроса к API',
                'status' => $statusCode,
                'error' => $errorMessage,
            ], $statusCode);
        }
    }

}
