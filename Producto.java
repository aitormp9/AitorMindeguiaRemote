public class Producto {
    private int id_producto;
    private String Nombre;
    private String Descripcion;
    private double Precio;
    private int Stock;
    private int id_categoria;
    private String Imagen;

    public Producto(int id_producto, String Nombre, String Descripcion, double Precio, int Stock, int id_categoria,
            String Imagen) {
        this.id_producto = id_producto;
        this.Nombre = Nombre;
        this.Descripcion = Descripcion;
        this.Precio = Precio;
        this.Stock = Stock;
        this.id_categoria = id_categoria;
        this.Imagen = Imagen;
    }

    public void setID_producto(int id_producto) {
        this.id_producto = id_producto;
    }

    public void setNombre(String Nombre) {
        this.Nombre = Nombre;
    }

    public void setDescripcion(String Descripcion) {
        this.Descripcion = Descripcion;
    }

    public void setPrecio(double Precio) {
        this.Precio = Precio;
    }

    public void setStock(int Stock) {
        this.Stock = Stock;
    }

    public void setID_categoria(int id_categoria) {
        this.id_categoria = id_categoria;
    }

    public void setImagen(String Imagen) {
        this.Imagen = Imagen;
    }

    public int getId_producto() {
        return id_producto;
    }

    public String getNombre() {
        return Nombre;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public double getPrecio() {
        return Precio;
    }

    public int getStock() {
        return Stock;
    }

    public int getId_categoria() {
        return id_categoria;
    }

    public String getImagen() {
        return Imagen;
    }
}
