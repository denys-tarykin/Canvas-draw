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

    this.draw = function(context){
        for(var j=0;j<objects.length;j++){
            obj = new DrawObj();
            if(objects[j].end<0)
                start=objects[j].start;
            else
                start =objects[j].end;
            obj.setStart(start);
            h = Math.abs(objects[j].end - objects[j].start);
            obj.setHeight(h);
            obj.setColor(objects[j].color);
            obj.setWidth(objects[j].width);
            obj.setDescription(objects[j].description);
            obj.setName(objects[j].className);
            obj_array[j] = obj;
            checkParameters(objects[j].width,h,20);
            if(objects[j].end>0)
                setMaxH(start);
            if(objects[j].start<0)
                setMinH(objects[j].start);

        }
        context.font = 'italic 15px sans-serif';
        context.textBaseline = 'top';
        context.strokeStyle="#000000";
        zero = MaxH*k;
        context.moveTo(20,0);
        context.lineTo(20,zero);
        context.moveTo(20,zero);
        context.lineTo(900,zero);
        context.fillText ("0",30,zero);
        context.moveTo(20,zero);
        context.lineTo(20,zero-MinH*k);

        var length=obj_array.length;
        var modal = document.getElementById("test");
        var text = document.getElementById("testText");
        for(var n=0;n<length;n++){
            var width = parseInt(obj_array[n].getWidth())*k;
            var start = MaxH-obj_array[n].getStart();
            new_center = center-width/2;
            var  h =obj_array[n].getHeight()*k;
            if(obj_array[n].getStart()!=0){
                context.moveTo(20,start*k);
                context.lineTo(35,start*k);
                st = obj_array[n].getStart();
                context.fillStyle = 'black';
                    context.fillText (st,30,start*k);
                if(n == length-1) {
                    context.moveTo(20,start*k);
                    context.lineTo(20,start*k+h);
                }
            }

            var name =obj_array[n].getName();
            text.textContent=name;
            modal.style.display='block';
            var dx =text.offsetWidth;
            var dy =text.offsetHeight;

            context.strokeRect(80, modalY+dy, dx+20,  dy+10);
            context.fillText (name,85,modalY+dy+5);
            modalEndH = 100+dx;
            modalEndW = modalY;
            modalY = modalY + dy + 45;
            modal.style.display='none';
            context.moveTo(new_center,start*k);
            context.lineTo(modalEndH,modalEndW);
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

                if(x>=arr[i].getXStart()&&x<=arr[i].getXEnd())
                    desc = arr[i].getDescroption();
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



































