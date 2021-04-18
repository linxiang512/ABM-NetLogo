var childrenWindows = [];
window.onload = function(){
	window.addEventListener("click", e => {
		var turtleNum = BreedManager._breeds.TURTLES.members.length;
		// exit if no turtles or turtles are not defined
		if ((turtleNum <= 0) || (turtleNum == undefined))
			return;
		//exit if not clicking on the canvas
		if (e.target.className != "netlogo-canvas unselectable")
			return;
		//translate the coordinates to 0 to X
		var worldMaxX = Math.abs(world.topology.minPxcor - world.topology.maxPxcor);
		var worldMaxY = Math.abs(world.topology.minPycor - world.topology.maxPycor);

		// convert the clicks to the simulation coordinates
		var xConverted = world.topology.minPxcor + ((e.offsetX / e.target.clientHeight) * worldMaxX);
		var yConverted = -1 * (world.topology.minPycor + ((e.offsetY / e.target.clientWidth) * worldMaxY));
		
		//BUG sometimes the agents are shown on the canvas in a differenet position than where they actually are
		//Debug statement to see in the console where the click is in the sumulation world
		console.log("X = " + xConverted + ": Y = " + yConverted)

		var closestDist;
		var closestTurtle;
		//step through the turtles and find which one is the closest to the user click
		for (let step = 0; step < turtleNum; step++){
			var currTurtle = BreedManager._breeds.TURTLES.members[step];
			var dist = (Math.pow(currTurtle.xcor - xConverted,2)) + (Math.pow(currTurtle.ycor - yConverted,2));
			dist = Math.sqrt(dist);
			if (step == 0) {
				closestDist = dist;
				closestTurtle = step;
			} else if (dist < closestDist){
				closestDist = dist;
				closestTurtle = step;
			}
		}

		//take the world X coordinate and divide that by how close the click and that will give you a closeness that you can tailor to make click more or less sensative
		var per = .02;
		var closeness = closestDist / worldMaxX;
		if (closeness <= per){
			console.log("Turtle number " + closestTurtle + " meets the closeness goal");
			let temp = window.open("assets/pages/turtleview.html","test " + closestTurtle,"width=350,height=500");
			temp.turtle = closestTurtle;
			childrenWindows.push(temp);
		}
	});
};
