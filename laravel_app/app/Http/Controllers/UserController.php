<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
    protected $userService;
    private const PATH = "/admin/users";

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;

    }

    public function index(Request $request)
    {
        $inputs = [];
        $inputs['page'] = $request->page ?? 1;
        $inputs['limit'] = $request->limit ?? 15;
        $inputs['order_by'] = $request->order_by ?? 'id';
        $inputs['sort'] = $request->sort ?? 'asc';
        $inputs['term'] = $request->term ? base64_decode($request->term) : '';
        $inputs['term'] = $inputs['term'] ? json_decode($inputs['term'], true)['term'] : '';
        // [
        //     [
        //         [
        //             'field' => 'products.name',
        //             'cond' => 'include',
        //             'value' => '13',
        //         ],
        //     ],
        //     "atque",
        // ];
        $inputs['filter'] = $request->filter ?? [];


        // dd($inputs);
        $res = $this->userService->search($inputs);
        // dd($res);
        $data = $res['data'];
        $data['page'] = (int) $inputs['page'];
        $data['limit'] = (int) $inputs['limit'];
        $data['order_by'] = $inputs['order_by'];
        $data['sort'] = $inputs['sort'];

        $tabItem = [
            'label' => 'DS Người dùng',
            'path' => self::PATH,
            'key' => 'users',
        ];
        return Inertia::render('Users/Users', [
            'data' => $data,
            'tabItem' => $tabItem,
            //            'laravelVersion' => Application::VERSION,
            //            'phpVersion' => PHP_VERSION,
        ]);
    }



    public function create()
    {

        $tabItem = [
            'label' => 'Thêm Người dùng',
            'path' => self::PATH . '/create',
            'key' => 'users-create',
        ];
        return Inertia::render('Users/Create', [
            'tabItem' => $tabItem,
            //            'laravelVersion' => Application::VERSION,
            //            'phpVersion' => PHP_VERSION,
        ]);
    }


    public function store(Request $request)
    {
        $this->validateInput($request);
        $data = $this->userService->store($request->all());
        return redirect()->route('users.create');
    }


    public function show(string $id)
    {
        $data = $this->userService->findById($id);
        $data = $data['data'];

        $tabItem = [
            'label' => 'Người dùng - ' . $data['name'],
            'path' => self::PATH . "/$id",
            'key' => 'users-show-' . $data['id'],
        ];

        return Inertia::render('Users/Show', [
            'data' => $data,
            'tabItem' => $tabItem,
            //            'laravelVersion' => Application::VERSION,
            //            'phpVersion' => PHP_VERSION,
        ]);
    }


    public function edit(string $id)
    {
        $data = $this->userService->findById($id);
        $tabItem = [
            'label' => 'Người dùng - ' . $data['name'],
            'path' => self::PATH . "/$id",
            'key' => 'users-show-' . $data['id'],
        ];
        return Inertia::render('Users/Create', [
            'data' => $data['data'],
            'tabItem' => $tabItem,
            //            'laravelVersion' => Application::VERSION,
            //            'phpVersion' => PHP_VERSION,
        ]);
    }


    public function update(Request $request, string $id)
    {
        $this->validateInput($request, $id);
        $this->userService->update($id, $request->all());
    }


    public function destroy(string $id)
    {
        $this->userService->destroy($id);
        return redirect()->route('users.index');
    }

    public function validateInput(Request $request, $id = null)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'password' => 'required|min:1',
        ]);
    }
}
