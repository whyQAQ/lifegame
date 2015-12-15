var Game_of_life = (function(){
    var SIZE = 10;
    var X_MAX = 30;
    var Y_MAX = 20;
    var LIVE_CELL = "#d05257";
    var LIVE = true;
    var DEAD = false;
    var TURN_SPEED = 500; //ms
    var cells = new Array(Y_MAX*X_MAX);
    var aaa = {};
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
                aaa[i] = LIVE;
            }

            if((j< 2 || j > 3) && cells[i] == LIVE){
                aaa[i] = DEAD;
            }
        }
    }

    function bbb(){
        for(var i= 0; i<cells.length;i++){
            for(name in aaa){
                if(i == name){
                    cells[i] = aaa[name];
                }
            }
        }
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
        cells[125]= LIVE;
        cells[126]= LIVE;
        cells[127]= LIVE;

        cells[255]= LIVE;
        cells[253]= LIVE;
        cells[285]= LIVE;
        cells[225]= LIVE;
        cells[284]= LIVE;

        cells[355]= LIVE;
        cells[353]= LIVE;
        cells[385]= LIVE;
        cells[325]= LIVE;
        cells[354]= LIVE;
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
        bbb();
        alert("a");
        setTimeout(main_loop,TURN_SPEED);
    }

    function start(){
        init();
        main_loop();
    }

    return{
        start: start
    }
})();
