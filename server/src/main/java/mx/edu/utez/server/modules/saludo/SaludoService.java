package mx.edu.utez.server.modules.saludo;

import org.springframework.stereotype.Service;

import mx.edu.utez.server.modules.saludo.dto.SaludoRequest;
import mx.edu.utez.server.modules.saludo.dto.SaludoResponse;

@Service
public class SaludoService {
    
    public SaludoResponse saludar(SaludoRequest request) {
        String nombreCompleto = request.getNombre() + " " + request.getApellido();
        String saludo = "Hola " + nombreCompleto.trim() + ", ¿Cómo estás?";
        
        SaludoResponse response = new SaludoResponse();
        response.setSaludo(saludo);
        
        return response;
    }
}

