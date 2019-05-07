function main()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var geometry = new THREE.Geometry();
    var vertices = [
	[ -1, -1, -1],
	[ 1, -1, -1],
	[ -1, 1, -1],
	[ -1, -1, 1],
	[ 1, 1, -1],
	[ 1, -1, 1],
	[ -1, 1, 1],
	[ 1, 1, 1]
    ];
    var faces =[
	[ 0, 1, 5],
	[ 5, 3, 0],
	[ 1, 4, 7],
	[ 7, 5, 1],
	[ 3, 5, 7],
	[ 3, 7, 6],
	[ 0, 3, 6],
	[ 0, 6, 2],
	[ 2, 6, 7],
	[ 7, 4, 2],
	[ 0, 2, 4],
	[ 4, 1, 0]
    ];
    
    var v0 = new THREE.Vector3().fromArray( vertices[0] );
    var v1 = new THREE.Vector3().fromArray( vertices[1] );
    var v2 = new THREE.Vector3().fromArray( vertices[2] );
    var v3 = new THREE.Vector3().fromArray( vertices[3] );
    var v4 = new THREE.Vector3().fromArray( vertices[4] );
    var v5 = new THREE.Vector3().fromArray( vertices[5] );
    var v6 = new THREE.Vector3().fromArray( vertices[6] );
    var v7 = new THREE.Vector3().fromArray( vertices[7] );

    var geometry = new THREE.Geometry();

    geometry.vertices.push( v0 );
    geometry.vertices.push( v1 );
    geometry.vertices.push( v2 );
    geometry.vertices.push( v3 );
    geometry.vertices.push( v4 );
    geometry.vertices.push( v5 );
    geometry.vertices.push( v6 );
    geometry.vertices.push( v7 );
    
    for(i=0;i<12;i++){
	var id = faces[i];
	geometry.faces.push( new THREE.Face3( id[0], id[1], id[2] ));	
    }
 
    var material = new THREE.MeshBasicMaterial();
  
    material.vertexColors = THREE.FaceColors;
    for(i=0;i<12;i++){
	geometry.faces[i].color = new THREE.Color( 1, 0, 0 );
    }
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    
    var light = new THREE.PointLight( 0xffffff ,1);
    light.position.set( 1, 1, 1 );
    scene.add( light );


    document.addEventListener('mousedown',mouse_down_event);
    function mouse_down_event(event)
    {
	var x_win = event.clientX;
	var y_win = event.clientY;

	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;
	
	var x_NDC = 2 * ( x_win - vx ) / vw - 1;
	var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );

	var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
	var p_wld = p_NDC.unproject( camera );

	var origin = camera.position;
        var direction = p_wld.sub( camera.position ).normalize();
	
	var raycaster = new THREE.Raycaster( origin, direction );
	var intersects = raycaster.intersectObject( cube );
	if ( intersects.length > 0 )
	{
	    intersects[0].face.color.setRGB( 0, 1, 1 );
	    intersects[0].object.geometry.colorsNeedUpdate = true;
	}
    }
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.02;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
	
    }
    
}
