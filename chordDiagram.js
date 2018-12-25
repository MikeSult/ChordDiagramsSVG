//
// chordDiagram.js
//
//
// to create documentation:
// %: cd ~/Documents/HTML/ChordDiagramsSVG
// %: documentation build chordDiagram.js -f html -o docs
//
/**
 * @overview This module is used to create chord diagram using SVG <br>
 * demo: <a href="../BasicChords.html" target="_blank">BasicChords.html</a>
 * @module chordDiagram.js
 * @example
 * 4 required parameters:
 *     dots = [six,five,four,three,two,one]; array of fret location on the strings from 6-1
 *            NOTE: null will X that string and a negative value will ignore marking that string.
 *     root = [string,fret]; string/fret location of root, possible different than any of the dots, i.e. rootless voicing
 *     numberOFFrets = number of frets to draw in the diagram
 *     id = the id of the span tag to place the diagram
 *
 * optional parameter
 *     offsetFret = [theFret, theNumber]  optional fret number marker (on the side of the diagram) 
 */
 
// SVG chord diagram
// 4 required parameters:
//     dots = [six,five,four,three,two,one]; array of fret location on the strings from 6-1
//            NOTE: null will X that string and a negative value will ignore marking that string.
//     root = [string,fret]; string/fret location of root, possible different than any of the dots, i.e. rootless voicing
//     numberOFFrets = number of frets to draw in the diagram
//     id = the id of the span tag to place the diagram
//
// optional parameter
//     offsetFret = [theFret, theNumber]  OPTIONAL fret number marker (on the side of the diagram) 
//
// TODO: design a module pattern: return this function but let the module be initialized with 
//  a config object to customize fretDotColor and scaleFactor
// TODO: add optional boolean flag to display pitch names on the dots. (use dots array w/guitar tuning to calculate names) Probably need to use a larger scale.
// TODO: add optional fingering number on the dots. fingering = [six,five,four,three,two,one]
//
/**
 * This function creates a SVG chord diagram
 * @param {object} dots - an array of fret loactions on string from 6 to 1 
 * @param {object} root = a two element array - [stringNum, fretLoc]
 * @param {number} numberOfFrets
 * @param {string} id - the id of the span tag to place the diagram
 * @param {object} offsetFret - optional [theFret, theNumber] fret number marker (on the side of the diagram)
 * @example
 * // assumes the html page has a span with the id of 'chord1-1'
 * ChordDiagram([null,null,2,4,4,4],[4,2],5,"chord1-1");
 */
function ChordDiagram(dots, root, numberOfFrets, id, offsetFret) {
    var msg = "ChordDiagram() six="+dots[0]+" five="+dots[1]+" four="+dots[2]+" three="+dots[3]+" two="+dots[4]+" one="+dots[5];
//    console.log(msg);
    let fretNumberInfo = (offsetFret === undefined) ? [null,null] : offsetFret; 
    let scaleFactor = 20;
	let height = numberOfFrets * scaleFactor;
	let width = 6 * scaleFactor;
	let xOffset = Math.floor(width/5);
	let yOffset = Math.floor(width/7);
	let fretWidth = Math.floor(width/6);
	let stringSpacing = Math.floor(width/8.5);
	let numFrets = numberOfFrets;
	let dotOffset = Math.floor(width/15);
	let dotSizeNote = Math.floor(width/30);
	let dotSizeRoot = Math.floor(width/17);
	let length = fretWidth*(numFrets-1);
	let omitStringLoc = Math.floor(width/8);
	let openStringLoc = Math.floor(width/13);
	var yLoc;
	let openDotColor = "white";
	let fretDotColor = "red";
	var dotColor;
	var ignoreThisString = false;

	let sideOffsetY = -Math.floor(width/30);
	var sideOffsetX = Math.floor(width/20);
    var showPitchNames = false;
    
    
	var htmlCode = "<svg height=" + (height+(yOffset*2)) + " width=" + width + ">\n";
	// draw verical line (strings)
    for(let i=0; i<6; i++) {
        var spacing = stringSpacing * i;
        htmlCode +=  "<line x1=" + (xOffset+spacing) +" y1=" + yOffset + " x2=" + (xOffset+spacing) + " y2=" + (length+yOffset) + " style=\"stroke:rgb(0,0,0);stroke-width:2\" />\n";
    }
    // draw horizontal lines (frets)
    for(let i=0; i<numFrets; i++) {
        var fretSpace = fretWidth * i; 
        htmlCode += "<line x1=" + xOffset + " y1=" + (fretSpace+yOffset) + " x2=" + (xOffset+(stringSpacing*5)) + " y2=" + (fretSpace+yOffset) + " style=\"stroke:rgb(0,0,0);stroke-width:1\" />\n";
    }

    // draw the root circle
    var yRootLoc = String((fretWidth * root[1])-dotOffset+yOffset)
	htmlCode += "<circle cx='"+ String(xOffset + (stringSpacing * (6-root[0]) )) +"' cy='"+ yRootLoc +"' r='"+dotSizeRoot+"' stroke='black' stroke-width='1' fill='"+openDotColor+"' />";

    // draw the dots
    ignoreThisString = false;
    // string 6
    if(dots[0] !== null) {
        if(dots[0] < 0) {
            ignoreThisString = true;
        } else if(dots[0] === 0) {
            yLoc = openStringLoc;
            dotColor = openDotColor;
        } else {
            yLoc = String((fretWidth * dots[0])-dotOffset+yOffset);
            dotColor = fretDotColor;
        }
        if(!ignoreThisString) {
            htmlCode += "<circle cx='"+ String(xOffset + (stringSpacing * 0)) +"' cy='"+ yLoc +"' r='"+dotSizeNote+"' stroke='black' stroke-width='1' fill='"+dotColor+"' />";
        }
    } else {
        // draw an X on this string
        htmlCode += "<text x='"+ String(xOffset/2 + (stringSpacing * 0)) +"' y='"+ omitStringLoc +"' fill='black'>X</text>";
    }
    ignoreThisString = false;
    // string 5
    if(dots[1] !== null) {
        if(dots[1] < 0) {
            ignoreThisString = true;
        } else if(dots[1] === 0) {
            yLoc = openStringLoc;
            dotColor = openDotColor;
        } else {
            yLoc = String((fretWidth * dots[1])-dotOffset+yOffset);
            dotColor = fretDotColor;
        }
        if(!ignoreThisString) {
            htmlCode += "<circle cx='"+ String(xOffset + (stringSpacing * 1)) +"' cy='"+ yLoc +"' r='"+dotSizeNote+"' stroke='black' stroke-width='1' fill='"+dotColor+"' />";
        }
    } else {
        // draw an X on this string
        htmlCode += "<text x='"+ String(xOffset/2 + (stringSpacing * 1)) +"' y='"+ omitStringLoc +"' fill='black'>X</text>";
    }
    ignoreThisString = false;
    // string 4
    if(dots[2] !== null) {
        if(dots[2] < 0) {
            ignoreThisString = true;
        } else if(dots[2] === 0) {
            yLoc = openStringLoc;
            dotColor = openDotColor;
        } else {
            yLoc = String((fretWidth * dots[2])-dotOffset+yOffset);
            dotColor = fretDotColor;
        }
        if(!ignoreThisString) {
            htmlCode += "<circle cx='"+ String(xOffset + (stringSpacing * 2)) +"' cy='"+ yLoc +"' r='"+dotSizeNote+"' stroke='black' stroke-width='1' fill='"+dotColor+"' />";
        }
    } else {
        // draw an X on this string
        htmlCode += "<text x='"+ String(xOffset/2 + (stringSpacing * 2)) +"' y='"+ omitStringLoc +"' fill='black'>X</text>";
    }
    ignoreThisString = false;
    // string 3
    if(dots[3] !== null) {
        if(dots[3] < 0) {
            ignoreThisString = true;
        } else if(dots[3] === 0) {
            yLoc = openStringLoc;
            dotColor = openDotColor;
        } else {
            yLoc = String((fretWidth * dots[3])-dotOffset+yOffset);
            dotColor = fretDotColor;
        }
        if(!ignoreThisString) {
            htmlCode += "<circle cx='"+ String(xOffset + (stringSpacing * 3)) +"' cy='"+ yLoc +"' r='"+dotSizeNote+"' stroke='black' stroke-width='1' fill='"+dotColor+"' />";
        }
    } else {
        // draw an X on this string
        htmlCode += "<text x='"+ String(xOffset/2 + (stringSpacing * 3)) +"' y='"+ omitStringLoc +"' fill='black'>X</text>";
    }
    ignoreThisString = false;
    // string 2
    if(dots[4] !== null) {
        if(dots[4] < 0) {
            ignoreThisString = true;
        } else if(dots[4] === 0) {
            yLoc = openStringLoc;
            dotColor = openDotColor;
        } else {
            yLoc = String((fretWidth * dots[4])-dotOffset+yOffset);
            dotColor = fretDotColor;
        }
        if(!ignoreThisString) {
            htmlCode += "<circle cx='"+ String(xOffset + (stringSpacing * 4)) +"' cy='"+ yLoc +"' r='"+dotSizeNote+"' stroke='black' stroke-width='1' fill='"+dotColor+"' />";
        }
    } else {
        // draw an X on this string
        htmlCode += "<text x='"+ String(xOffset/2 + (stringSpacing * 4)) +"' y='"+ omitStringLoc +"' fill='black'>X</text>";
    }
    ignoreThisString = false;
    // string 1
    if(dots[5] !== null) {
        if(dots[5] < 0) {
            ignoreThisString = true;
        } else if(dots[5] === 0) {
            yLoc = openStringLoc;
            dotColor = openDotColor;
        } else {
            yLoc = String((fretWidth * dots[5])-dotOffset+yOffset);
            dotColor = fretDotColor;
        }
        if(!ignoreThisString) {
            htmlCode += "<circle cx='"+ String(xOffset + (stringSpacing * 5)) +"' cy='"+ yLoc +"' r='"+dotSizeNote+"' stroke='black' stroke-width='1' fill='"+dotColor+"' />";
        }
    } else {
        // draw an X on this string
        htmlCode += "<text x='"+ String(xOffset/2 + (stringSpacing * 5)) +"' y='"+ omitStringLoc +"' fill='black'>X</text>";
    }

    // draw the optional fret number
    if(fretNumberInfo[0] !== null) {
		var theFret = fretNumberInfo[0];
		var theNumber = fretNumberInfo[1];
		if(theNumber > 9) {
		    sideOffsetX = 0;
		}
        htmlCode += "<text x='"+ sideOffsetX +"' y='"+ String(theFret*fretWidth + yOffset+sideOffsetY) +"' fill='black'>"+ theNumber +"</text>";
        sideOffsetX = Math.floor(width/20);
    }

    htmlCode += "Sorry, your browser does not support inline SVG.\n</svg>";

    document.getElementById(id).innerHTML = htmlCode;
//    return htmlCode;
}

