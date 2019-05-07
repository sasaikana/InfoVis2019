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
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render( scene, camera );
    }
}
