package sal.service.home.core;

import java.util.Date;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import sal.service.home.Greeting;
import sal.service.home.models.request.RequestInquiryRefinance;
import sal.service.home.models.response.ResponseInquiryRefinance;

import javax.xml.ws.Response;

@RestController
public class GreetingController {

	private static final String template = "Hello, %s!";
	private final AtomicLong counter = new AtomicLong();

	@GetMapping("/greeting")
	public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
		return new Greeting(counter.incrementAndGet(), String.format(template, name));
	}
	
	@GetMapping("/aprGreeting")
	public Greeting aprGreeting(@RequestParam(value="currentDate") Date currentDate,
								@RequestParam(value="name", defaultValue = "World") String name) {
		RestTemplate restTemplate = new RestTemplate();
		return new Greeting(counter.incrementAndGet(), "No APR rates yet");
	}



}
