package sal.service.home.core.Controllers;

import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import sal.service.home.models.objects.Greeting;

@RestController
public class GreetingController {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		System.out.println("new date: " + (new Date(System.currentTimeMillis()).toString()));
		return new Greeting(counter.incrementAndGet(), (new Date(System.currentTimeMillis()).toString()));
	}
	
	@GetMapping("/aprGreeting")
	public Greeting aprGreeting(@RequestParam(value="currentDate") Date currentDate,
								@RequestParam(value="name", defaultValue = "World") String name) {
		RestTemplate restTemplate = new RestTemplate();
		return new Greeting(counter.incrementAndGet(), "No APR rates yet");
	}



}
