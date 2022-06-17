window.onload = main;

function main() {

    let canvas = document.getElementById("surface");
    let gl = canvas.getContext("webgl");

    if (!gl) {
        gl = canvas.getContext("experimental-webgl");
    }

    if (!gl) {
        console.log("Tu navegador no soporta WebGL");
        return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create Vertex Buffer
    var positions = [
        -0.5, -0.5, 1.0, 1.0, 0.0, 0.0, 1.0,
         0.5, -0.5, 1.0, 0.0, 1.0, 0.0, 1.0,
         0.0,  0.5, 1.0, 0.0, 0.0, 1.0, 1.0
    ]

    var vertexShader = `
        attribute vec4 a_Position;
        attribute vec4 a_Color;

        varying lowp vec4 v_Color;

        void main() {
            gl_Position = a_Position;
            v_Color = a_Color;
        }
    `;
    
    var fragmentShader = `
        precision mediump float;

        varying lowp vec4 v_Color;

        void main() {
            gl_FragColor = v_Color;
        }
    `;

    let vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create Vertex Layout
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 4 * 7, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 4 * 7, 4 * 3);

    // Create Shader
    let vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);
    var success = gl.getShaderParameter(vs, gl.COMPILE_STATUS);

    let fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);
    success = gl.getShaderParameter(fs, gl.COMPILE_STATUS);

    let program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.useProgram(program);

    function loop() {

        gl.clearColor(0.15, 0.15, 0.15, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.viewport(0, 0, window.innerWidth, window.innerHeight);

        gl.drawArrays(gl.TRIANGLES, 0, 3);
    
        requestAnimationFrame(loop);
    }
    loop();

}