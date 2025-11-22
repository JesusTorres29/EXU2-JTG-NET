package mx.edu.utez.server.modules.saludo;

import mx.edu.utez.server.modules.saludo.dto.SaludoRequest;
import mx.edu.utez.server.modules.saludo.dto.SaludoResponse;
import mx.edu.utez.server.utils.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/saludo")
@CrossOrigin(origins = "*")
public class SaludoController {
    
    @Autowired
    private SaludoService saludoService;
    
    @PostMapping("/saludar")
    public ResponseEntity<ApiResponse<SaludoResponse>> saludar(@RequestBody SaludoRequest request) {
        try {
            if (request.getNombre() == null || request.getNombre().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("El nombre es requerido"));
            }
            
            if (request.getApellido() == null || request.getApellido().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("El apellido es requerido"));
            }
            
            SaludoResponse response = saludoService.saludar(request);
            
            return ResponseEntity.ok(
                ApiResponse.success("Saludo generado exitosamente", response)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Error al procesar el saludo: " + e.getMessage()));
        }
    }
}


