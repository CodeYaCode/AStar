// index.js

$(document).ready(function() {
	init();
	setStart(5,4);
	setTarget(20,6);
	setWall(3,5);
	setWall(4,5);
	setWall(5,5);
	setWall(5,6);
	setWall(5,7);
	setWall(12,2);
	setWall(12,3);
	setWall(12,4);
	setWall(12,5);
	setWall(12,6);
	setWall(12,7);

	setWall(17,5);
	setWall(17,6);
	setWall(17,7);
	setWall(17,8);
	setWall(17,9);
});

// 每个方格的宽
const a = 30;

var start;
var target;

function init() {
	var con = $('.container');
	var width = con.width();
	var height = con.height();
	var num = width/30 * height/30;
	for (var i=0; i<num; i+=1) {
		con.append('<div class="block" data-id="'+i+'"><span class="none">'+i+'</span></div>')
	}
	$('.block').width(a-2 + 'px');
	$('.block').height(a-2 + 'px');
	$('.block').click(blockClick);
	$('.block').hover(blockHover);
}

function blockClick() {
	var id = $(this).attr("data-id");
	var obj = idToCord(id);
	var x = obj.x;
	var y = obj.y;
	console.log(cordToId(x, y) + ': ('+x+','+y+')');

	console.log('f(n)=', fn($(this), target));
}

function blockHover() {
	var id = $(this).attr("data-id");
	var obj = idToCord(id);
	var x = obj.x;
	var y = obj.y;
	$('#x').html("X: " + x);
	$('#y').html("Y: " + y);
}

// 设置起点
function setStart(x, y) {
	start = setObject(x, y, "start");
}

// 设置目标点
function setTarget(x, y) {
	target = setObject(x, y, "target");
}

// 设置障碍物
function setWall(x, y) {
	setObject(x, y, "wall");
}

function setObject(x, y, type) {
	var id = cordToId(x, y);
	var block = $('div[data-id="'+id+'"]')
	block.addClass(type);
	return block;
}

// 获得（x,y）附近的blocks
function getSurroundingBlocks(x, y) {
	return [getBlock(x,y+1),getBlock(x,y-1),getBlock(x-1,y),getBlock(x+1,y)];
		// ,getBlock(x-1,y-1),getBlock(x-1,y+1),getBlock(x+1,y-1),getBlock(x+1,y+1)]
}

function getBlock(x, y) {
	var id = cordToId(x, y);
	return getBlockById(id);
}

function getBlockById(id) {
	return $('div[data-id="'+id+'"');
}

// 根据坐标查询id
function cordToId(x, y) {
	return x + y * (a + 2);
}

// 根据id查询坐标
function idToCord(id) {
	var result = new Object();
	result.x = id % (a+2);
	result.y = Math.ceil(id / (a+2));
	result.y = result.x == 0 ? result.y : result.y - 1;
	return result
}

$('#start').click(function() {
	Astar(start, target);
});

$('#no').click(function() {
	var span = $('span');
	if (span.hasClass("none")) {
		span.removeClass("none");
	} else {
		span.addClass("none");
	}
})