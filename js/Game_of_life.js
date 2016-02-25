var Game_of_life = (function(){
    var SIZE = 10;
    var X_MAX = 50;
    var Y_MAX = 40;
    var LIVE_CELL = "#d05257";
    var LIVE = true;
    var DEAD = false;
    var TURN_SPEED = 100; //ms
    var cells = new Array(Y_MAX*X_MAX);
    var cache = {};
    var canvas;
    var pen;

    //初始化cell
    function dead_cells(){
        for(var i=0;i < cells.length;i++){
            cells[i] = DEAD;
        }
    }

    //根据下标给出坐标
    function make_coords(index){
        var x;
        var y;
        x = index%X_MAX;
        y = (index - x)/X_MAX;

        return {
            x: x,
            y: y
        }
    }

    //根据坐标给出下标
    function make_index(x,y){
        var index;
        index = y*X_MAX + x;
        return index;
    }

    //判断cell的生死
    function is_live(){
        for(var i= 0; i<cells.length;i++){
            var j = 0;
            if(cells[i-X_MAX-1] == LIVE){
                j++
            }
            if(cells[i-X_MAX] == LIVE){
                j++
            }
            if(cells[i-X_MAX+1] == LIVE){
                j++
            }
            if(cells[i-1] == LIVE){
                j++
            }
            if(cells[i+1] == LIVE){
                j++
            }
            if(cells[i+X_MAX-1] == LIVE){
                j++
            }
            if(cells[i+X_MAX] == LIVE){
                j++
            }
            if(cells[i+X_MAX+1] == LIVE){
                j++
            }

            if(j == 3 && cells[i] == DEAD){
                cache[i] = LIVE;
            }

            if((j< 2 || j > 3) && cells[i] == LIVE){
                cache[i] = DEAD;
            }
        }
    }

    function apply_cache(){
        for(var i= 0; i<cells.length;i++){
            for(name in cache){
                if(i == name){
                    cells[i] = cache[name];
                }
            }
        }
        cache = {};
    }

    //清除画布
    function clear() {
        pen.clearRect(0, 0, canvas.width, canvas.height);
    }

    //画出live cell
    function draw_live_cell(x,y){
        pen.fillStyle = LIVE_CELL;
        pen.fillRect(x*SIZE, y*SIZE, SIZE, SIZE);
    }

    //初始化状态变量
    function init(){
        canvas = document.getElementById("game");
        pen = canvas.getContext("2d");
        dead_cells();

        var cell_list = [
            [12,12],
            [12,13],
            [12,14],

            [21,15],
            [20,15],
            [22,15],
            [21,16],
            [21,17],

            [5,5],
            [6,6],
            [4,7],
            [5,7],
            [6,7],

            [35,5],
            [34,6],
            [34,7],
            [35,7],
            [36,7],

            [5,35],
            [6,34],
            [6,33],
            [5,33],
            [4,33]
        ];

        for (var i = 0; i<cell_list.length; i++) {
            var point = cell_list[i];
            cells[make_index(point[0], point[1])] = LIVE;
        }
    }


    //渲染画面
    function render(){
        clear();
        for(var i=0;i<cells.length;i++){
            if(cells[i] == LIVE){
                var live_cell = make_coords(i);
                draw_live_cell(live_cell.x,live_cell.y);
            }
        }
    }

    function main_loop(){
        render();
        is_live();
        apply_cache();
        setTimeout(main_loop,TURN_SPEED);
    }

    function start(){
        init();
        main_loop();
    }

    return {
        start: start
    };

})();
