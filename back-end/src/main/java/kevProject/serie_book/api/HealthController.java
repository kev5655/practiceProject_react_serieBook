package kevProject.serie_book.api;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class HealthController {

    @Value("${GIT_HASH:unknown}")
    private String gitHash;

    private final LocalDateTime startTime = LocalDateTime.now();

    /**
     * Health check endpoint that returns the GIT_HASH from environment variables
     * 
     * @return JSON containing status, git hash, and application information
     */
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> healthCheck() {
        log.info("Health check requested, returning git hash: {}", gitHash);

        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("gitHash", gitHash);
        response.put("serverTime", LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        response.put("uptime", getUptimeInformation());

        return ResponseEntity.ok(response);
    }

    /**
     * Calculate application uptime information
     * 
     * @return Map containing uptime details
     */
    private Map<String, Object> getUptimeInformation() {
        LocalDateTime now = LocalDateTime.now();
        long seconds = java.time.Duration.between(startTime, now).getSeconds();

        Map<String, Object> uptime = new HashMap<>();
        uptime.put("startTime", startTime.format(DateTimeFormatter.ISO_DATE_TIME));
        uptime.put("totalSeconds", seconds);
        uptime.put("days", seconds / 86400);
        uptime.put("hours", (seconds % 86400) / 3600);
        uptime.put("minutes", (seconds % 3600) / 60);
        uptime.put("seconds", seconds % 60);

        return uptime;
    }
}
