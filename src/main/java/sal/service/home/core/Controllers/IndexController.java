package sal.service.home.core.Controllers;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {
	@RequestMapping(method = RequestMethod.GET, value = "/")
	public String indexPage() {
		return "/templates/index_react.html";
	}
}