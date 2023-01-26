export class pickerColor{
  //Constructor de la clase que estamos exportando, con lso parametros target que sera el canvas y la altura y el ancho del elemento apra los posicionamientos;
  constructor(target, width, height){
    this.target = target;
    this.width = width;
    this.height = height;
    this.target.width = width;
    this.target.heigth = height;

    this.context = this.target.getContext("2d");
  }

  draw(){
    this.build();
  }

  build(){
    // para construir la paleta de colores degradados vamso a utilizar el linear gradient de canvas
    const gradient = this.context.createLinearGradient(this.width, 0, this.height, 0);

    // añadimos los colores del espectro
    gradient.addColorStop(0, "rgb(255,0,0)")
    gradient.addColorStop(0.16, "rgb(255,0,255)")
    gradient.addColorStop(0.33, "rgb(0,0,255)")
    gradient.addColorStop(0.49, "rgb(0,255,255)")
    gradient.addColorStop(0.65, "rgb(0,255,0)")
    gradient.addColorStop(0.81, "rgb(255,255,0)")
    gradient.addColorStop(1, "rgb(255,0,0)")
    this.context.fillStyle = gradient;
    this.context.fillRect(0, 0, this.width, 300);
  }

  mousePosition(){
    
  }

  getColor(positionX, positionY){
    console.log('Cuales son las posiciones --> ' + positionX + ' ' + positionY);
    const imagenData = this.context.getImageData(positionX, positionY, 1, 1, {
      colorSpace: "srgb"
    });
    return imagenData.data;
  }

  responsive(width, height){
    this.width = width;
    this.height = height;
  }
}
