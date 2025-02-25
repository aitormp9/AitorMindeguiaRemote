import java.util.Scanner;

public class App {

    public static boolean bienvenida(Scanner sc) {
        String usuario = "admin";
        int contraseña = 1234;
        boolean correcto = false;
        try {
            System.out.println("-----------------------------");
            System.out.println("¡Bienvenido a UsurbilTex!");
            System.out.println("-----------------------------");
            Thread.sleep(2999);
            System.out.println("Introduce el usuario: ");
            String usuarioIntroducido = sc.nextLine();
            System.out.println("Introduce la contraseña: ");
            int contraseñaIntroducida = sc.nextInt();
            sc.nextLine();
            if (usuarioIntroducido.equalsIgnoreCase(usuario) && contraseñaIntroducida == contraseña) {
                System.out.println("Iniciando sesión...");
                correcto = true;
            } else {
                System.out.println("Error: usuario o contraseña incorrectos, inténtelo de nuevo");
            }

        } catch (Exception e) {

        }
        return correcto;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        GestorProductos gp = new GestorProductos(sc);
        while (!bienvenida(sc)) {
        }
        gp.cargarArraylist();
        int opcion = 0;
        do {
            System.out.println("¿Qué desea hacer?");
            System.out.println("1.- Agregar nuevos productos");
            System.out.println("2.- Cargar desde csv");
            System.out.println("3.- Actualizar productos existentes");
            System.out.println("4.- Eliminar productos");
            System.out.println("5.- Exportar informacion");
            System.out.println("6.- Listar productos");
            System.out.println("7.- Buscar productos");
            System.out.println("0.- Salir");
            opcion = sc.nextInt();
            sc.nextLine();
            switch (opcion) {
                case 1:
                    gp.agregarProducto();
                    break;
                case 2:
                    gp.cargarCsv();
                    break;
                case 3:
                    gp.actualizarProductos();
                    break;
                case 4:
                    gp.eliminarProducto();
                    break;
                case 5:
                    gp.exportarDatosJson();
                    break;
                case 6:
                    gp.listarProductos();
                    break;
                case 7:
                    gp.buscarProductoConcreto();
                    break;
                case 0:
                    System.out.println("¡Gracias por utilizar UsurbilTex!");
                    System.out.println("Saliendo del programa...");
                    break;
                default:
                    System.out.println("Indroduce un valor válido (0-7): ");
                    break;
            }
        } while (opcion != 0);

        sc.close();
    }
}
