function init(objects) {
    var canvas = document.getElementById("myCanvas");
    canvas.width = 1024;
    canvas.height = 1280;
    var context = canvas.getContext("2d");
    var field = new Draw(objects);
    field.draw(context);

    canvas.onmousemove = function(e) {
        var x = (e.pageX - canvas.offsetLeft);
        var y = (e.pageY - canvas.offsetTop);
        var desc = field.getDesc(x, y);
        var modal = document.getElementById("modal");
        var modalTest = document.getElementById("modalTest");
        if(desc){
            modalTest.textContent=desc;
            modal.style.top=y+'px';
            modal.style.left=x-modal.offsetWidth-5+'px';
            modal.style.display='block';
        }
        else
            modal.style.display='none';
    };
}
function Draw(objects){
    var center=450;
    var arr = [];
    var obj_array = [];
    var MaxH = 0;
    var k = 0;
    var MinH=0;
    var modalY =30;
    var modalEndW=0;
    var modalEndH=0;
    var left_modal_arr = [];
    var right_modal_arr = [];
    var heights = [];


    this.draw = function(context){
        for(var j=0;j<objects.length;j++){
            obj = new DrawObj();
            start =objects[j].start;
            obj.setStart(start);
            h = Math.abs(objects[j].end - objects[j].start);
            obj.setHeight(h);
            obj.setColor(objects[j].color);
            obj.setWidth(objects[j].width);
            obj.setDescription(objects[j].description);
            obj.setName(objects[j].className);
            obj_array[j] = obj;
            checkParameters(objects[j].width,h,15);
            setMaxH(objects[j].end);
        }

        context.font = 'italic 15px sans-serif';
        context.textBaseline = 'top';
        context.strokeStyle="#000000";

        context.moveTo(20,0);
        context.lineTo(900,0);
        context.fillText ("0",30,0);
        context.moveTo(20,0);
        context.lineTo(20,MaxH*k);

        var length=obj_array.length;
        var modal = document.getElementById("test");
        var text = document.getElementById("testText");

        for(var n=0;n<length;n++){
            var width = parseInt(obj_array[n].getWidth())*k;
            var start = obj_array[n].getStart();
            new_center = center-width/2;
            var  h =obj_array[n].getHeight()*k;
            if(heights.indexOf(obj_array[n].getHeight())==-1){
                heights[n] = obj_array[n].getHeight();
                context.moveTo(20, h);
                context.lineTo(35, h);
                context.fillStyle = '#000000';
                context.fillText(obj_array[n].getHeight(), 30,h);
            }


            var name =obj_array[n].getName();
            text.textContent=name;
            modal.style.display='block';
            var dx =text.offsetWidth;
            var dy =text.offsetHeight;
            modal.style.display='none';
            about = new About();

            if(n ==0){
                context.strokeRect(80, h/2, dx+20,  dy+10);
                context.fillText (name,85,h/2+5);
                context.moveTo(new_center,h/2);
                context.lineTo(100+dx,h/2);
                about.setAboutStart( h/2+15);
                about.setAboutEnd(h/2+dy+10);
                about.setAboutY(h/2+dy+20);
                left_modal_arr[0]=about;
                console.log(h/2+15);
            }else{
                if(n% 2 === 0  ){
                    var new_y= buildAbout(h/2,left_modal_arr,dy);
                    var left_id = 1;
                    x = 80;
                    context.moveTo(new_center,new_y);
                    context.lineTo(x+dx+20,new_y);
                    about.setAboutStart(new_y);
                    about.setAboutEnd(new_y+dy);
                    about.setAboutY(new_y+dy+20);
                    left_modal_arr[left_id]=about;
                    left_id++;
                }
                else{
                    x=800;
                    var right_id = 0;
                    if(right_modal_arr.length ==0){
                        var new_y = h/2;
                        context.moveTo(new_center+width,new_y);
                        context.lineTo(x,new_y);
                    }
                    else
                       var new_y= buildAbout(h/2,right_modal_arr,dy);
                    context.moveTo(new_center+width,new_y);
                    context.lineTo(x,new_y);
                    about.setAboutStart(new_y);
                    about.setAboutEnd(new_y+dy);
                    about.setAboutY(new_y+dy+20);
                    right_modal_arr[right_id]=about;
                    right_id++;
                }
                context.strokeRect(x, new_y, dx+20,  dy+10);
                context.fillStyle = '#000000';
                context.fillText (name,x+5,new_y+5);


            }


            context.fillStyle  = obj_array[n].getColor();

            context.fillRect(new_center, start*k, width,  h);
            element = new Desc();
            element.setXStart(new_center);
            element.setXEnd(new_center+width);
            element.setY_Start(start*k);
            element.setY_End(start+obj_array[n].getHeight()*k);
            element.setDescroption(obj_array[n].getDescription());
            arr[n]=element;

        }
        context.stroke();

    };
    function buildAbout(start,modal,h){
        var return_data = start;
        for(var i=0;i<modal.length;i++){
            if(return_data>=modal[i].getAboutStart()&&return_data<=modal[i].getAboutEnd() || return_data+h>=modal[i].getAboutStart()&&return_data+h<=modal[i].getAboutEnd()){
                return_data= modal[i].getAboutY();
            }
        }
        return return_data;
    }
    function checkParameters(width,height,min){
        if(width*k<=min)
            SetK(width,min);
        if(height*k<=min)
            SetK(height,min);
    };
    function SetK(param,min){

        while (param*k<=min) {
            k+=0.1;
        }

    };
    function setMaxH(x){
        if(MaxH <x)
           MaxH = x;
    };
    function setMinH(x){
        if(MinH >x)
            MinH = x;
    }
    this.getDesc = function(x,y){
        var desc;
        for(var i=0;i<arr.length;i++){
            if(y>=arr[i].getY_Start()&&y<=arr[i].getY_End()){
                if(x>=arr[i].getXStart()&&x<=arr[i].getXEnd()){
                    desc = arr[i].getDescroption();
                }
            }
        }
        if(desc!='')
            return desc;
    }
};
function DrawObj(){
    var start;
    var height;
    var width;
    var color;
    var description;
    var name;

    this.setStart = function(x) {
        start = x;
    };
    this.getStart = function(){
        return start;
    };

    this.setHeight=function(x){
        height = x;
    };
    this.getHeight = function(){
        return height;
    };

    this.setWidth=function(x){
        width = x;
    };

    this.getColor = function(){
        return color;
    };
    this.setColor=function(x){
        color = x;
    };
    this.getDescription = function(){
        return description;
    };
    this.setDescription=function(x){
        description = x;
    };
    this.getWidth = function(){
        return width;
    };
    this.setName=function(x){
        name = x;
    };
    this.getName = function(){
        return name;
    };

}
function Desc(){
    var xStart;
    var xEnd;
    var Y_Start;
    var Y_End;
    var Descroption;

    this.setXStart = function(x) {
        xStart = x;
    };
    this.getXStart = function(){
        return xStart;
    };

    this.setXEnd = function(x) {
        xEnd = x;
    };
    this.getXEnd = function(){
        return xEnd;
    };

    this.setY_Start = function(x) {
        Y_Start = x;
    };
    this.getY_Start = function(){
        return Y_Start;
    };

    this.setY_End = function(x) {
        Y_End = x;
    };
    this.getY_End = function(){
        return Y_End;
    };

    this.setDescroption = function(x) {
        Descroption = x;
    };
    this.getDescroption = function(){
        return Descroption;
    };

}
function About(){
    var start;
    var end;
    var y;

    this.setAboutStart = function(x) {
        start = x;
    };
    this.getAboutStart = function(){
        return start;
    };
    this.setAboutEnd = function(x) {
        end = x;
    };
    this.getAboutEnd = function(){
        return end;
    };
    this.setAboutY = function(x){
        y = x;
    }
    this.getAboutY = function(){
        return y;
    }
};



































