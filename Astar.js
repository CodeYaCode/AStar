// Astar.js

// 系数
const D = 10;
const INFINIT = 1000000;

// 估值函数
var hn = heuristic_Manhattan;

function fn(ob1, ob2) {
	return gn(ob1, ob2) + hn(ob2, target);
}

function gn(ob1, ob2) {
	if (ob1.hasClass("wall") || ob2.hasClass("wall")) {
		return INFINIT;
	}
	var id1 = ob1.attr("data-id");
	var o1 = idToCord(id1);
	var id2 = ob2.attr("data-id");
	var o2 = idToCord(id2);
	return Math.floor(10 * Math.sqrt((o1.x - o2.x) * (o1.x - o2.x) + (o1.y - o2.y) * (o1.y - o2.y)));
}

// 曼哈顿估价函数
function heuristic_Manhattan(ob1, ob2) {
	if (ob1.hasClass("wall") || ob2.hasClass("wall")) {
		return INFINIT;
	}
	var id1 = ob1.attr("data-id");
	var o1 = idToCord(id1);
	var id2 = ob2.attr("data-id");
	var o2 = idToCord(id2);
	return D * (Math.abs(o1.x - o2.x) + Math.abs(o1.y - o2.y));
}

// A* algorithm
function Astar(s, t) {
	var closedSet = new Map();
	var openSet = new Map();
	var sId = s.attr("data-id");
	openSet.set(sId, 0);
	var cameFrom = new Map();
	var gScore = new Map();
	gScore.set(sId, 0);
	var fScore = new Map();
	fScore.set(sId, fn(s, t));
	var kk = 0;
	while (openSet.size > 0) {
		var cId;
		var min = INFINIT;
		openSet.forEach(function(value, key, map) {
			if (fScore.get(key) < min) {
				cId = key;
				min = fScore.get(key);
			}
		});
		var current = getBlockById(cId);
		if (cId === t.attr("data-id")) {
			return reconstructPath(cameFrom, cId);
		}
		openSet.delete(cId);
		closedSet.set(cId, 0);

		var obj = idToCord(cId);
		var array = getSurroundingBlocks(obj.x, obj.y);
		// current.addClass("current");
		for (var i = 0; i < array.length; i++) {
			var block = array[i];
			var id = block.attr("data-id");
			if (!block.hasClass("start") && !block.hasClass("target") 
				&& !block.hasClass("current") && !block.hasClass("wall")) {
				block.css("background", "yellow");
			}
			if (closedSet.has(id)) {
				continue;
			}
			if (!openSet.has(id) && !block.hasClass("wall")) {
				openSet.set(id, 0);
			}
			var tentative_gScore = gScore.get(cId) + gn(current, block);
			// console.log(kk, i, "-----------------");
			// console.log("current", cId);
			// console.log("block", id);
			// console.log("openSet", openSet);
			// console.log("closedSet: ", closedSet);
			// console.log("gScore", gScore);
			// console.log("fScore", fScore);
			// console.log("ttt: ", gScore.get(cId));
			// console.log("gn: ", gn(current, block));
			// console.log("tentative_gScore", tentative_gScore);
			// console.log("cameFrom", cameFrom);
			if (tentative_gScore >= gScore.get(id)) {
				continue;
			}
			cameFrom.set(id, cId);
			gScore.set(id, tentative_gScore);
			fScore.set(id, gScore.get(id) + hn(block, t));
			console.log("fn", gScore.get(id) + hn(block, t));
			// console.log(kk, i, "-----------------");
		}
		kk++;
		if (kk > 10000) {
			break;
		}
	}
	alert("no path found.");
}

function reconstructPath(cameFrom, cId) {
	var totalPath = cId;
	var sId = start.attr("data-id");
	while (cId != sId) {
		cId = cameFrom.get(cId);
		printPath(cId);
		totalPath += "->";
		totalPath += cId;
	}
	console.log(totalPath);
	return;
}

function printPath(id) {
	var block = getBlockById(id);
	if (!block.hasClass("start") && !block.hasClass("target")) {
		block.css("background", "#008CCB");
	}
}