function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: window.innerWidth,
        height: window.innerHeight,
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue, 'Phong', '#ff0000' );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth, window.innerHeight ] );
    });

    screen.loop();

    var DefaultSquare = function() {
        this.Color = "#ff0000";
        this.Isovalue = 128;
        this.Bounds = true;
        this.Reflection = 'Phong';
    }; 

    window.onload = function() {
        square = new DefaultSquare();
        var gui = new dat.GUI();
        gui.addColor(square, 'Color').onFinishChange(setValue);
        gui.add(square, 'Isovalue', 0, 255).step(1).onFinishChange(setValue);
        gui.add(square, 'Reflection', [ 'Lambertian', 'Phong', 'BlinnPhong', 'CookTorrance', 'Toon' ] ).onFinishChange(setValue);
        gui.add(square, 'Bounds').onChange(setBounds);
        };

        function setValue() 
    {
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces( volume, square.Isovalue, square.Reflection, square.Color );
        screen.scene.add(surfaces);
    }
    function setBounds() 
    {
        if(square.Bounds)
        {
            screen.scene.add(bounds);
        }
        else
        {
            screen.scene.remove(bounds);        
        }
    }

}
