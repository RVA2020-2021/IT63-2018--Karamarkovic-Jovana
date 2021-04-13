package rva.crtls;

import java.math.BigDecimal;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.jpa.Racun;
import rva.jpa.StavkaRacuna;
import rva.repository.RacunRepository;
import rva.repository.StavkaRacunaRepository;

@CrossOrigin
@RestController
@Api(tags = {"Stavka racuna CRUD operacije"})
public class StavkaRacunaRestController {

	@Autowired 
	private JdbcTemplate jdbcTemplate;
	
	@Autowired 
	private StavkaRacunaRepository stavkaRacunaRepository;
	
	@Autowired
	private RacunRepository racunRepository;
	
	@GetMapping("stavkaRacuna")
	@ApiOperation(value = "Vraća kolekciju svih stavki racuna iz baze podataka")
	public Collection<StavkaRacuna> getStavkeRacuna() {
		return stavkaRacunaRepository.findAll();
	}
	
	@GetMapping("stavkaRacuna/{id}")
	@ApiOperation(value = "Vraća stavku racuna iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public StavkaRacuna getStavkaRacuna(@PathVariable("id") Integer id){
		return stavkaRacunaRepository.getOne(id);
	}
	
	
	@GetMapping("stavkaZaRacuneId/{id}")
	@ApiOperation(value = "Vraća kolekciju svih stavki racuna iz baze podataka koji sadrže id racuna koji je prosleđen kao path varijabla")
	public Collection<StavkaRacuna> stavkeRacunaId(@PathVariable("id") Integer id)
	{
		Racun r = racunRepository.getOne(id);
		return stavkaRacunaRepository.findByRacun(r);
	}
	
	@GetMapping("stavkaRacunaCena/{cena}")
	@ApiOperation(value = "Vraća kolekciju svih stavki racuna iz baze podataka koji imaju manju cenu od prosleđene kao path varijabla")
	public Collection<StavkaRacuna> stavkeRacunaCena(@PathVariable("cena") BigDecimal cena) {
		return stavkaRacunaRepository.findByCenaLessThanOrderById(cena);
	}
	
	@PostMapping("stavkaRacuna")
	@ApiOperation(value = "Upisuje stavku racuna u bazu podataka")
	public ResponseEntity<StavkaRacuna> insertStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna) {
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId())) {
			stavkaRacuna.setRedniBroj(stavkaRacunaRepository.nextRBr(stavkaRacuna.getRacun().getId()));
			stavkaRacunaRepository.save(stavkaRacuna);
			return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.CONFLICT);
	}
	
	@PutMapping("stavkaRacuna")
	@ApiOperation(value = "Modifikuje postojecu stavku racuna u bazi podataka")
	public ResponseEntity<StavkaRacuna> updateStavkaRacuna(@RequestBody StavkaRacuna stavkaRacuna) {
		if(!stavkaRacunaRepository.existsById(stavkaRacuna.getId())) {
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		stavkaRacunaRepository.save(stavkaRacuna);
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
	}
	
	@DeleteMapping("stavkaRacuna/{id}")
	@ApiOperation(value = "Briše stavku racuna iz baze podataka čija je id vrednost prosleđena kao path varijabla")
	public ResponseEntity<StavkaRacuna> deleteStavkaRacuna(@PathVariable("id") Integer id) {
		if(!stavkaRacunaRepository.existsById(id)) {
			return new ResponseEntity<StavkaRacuna>(HttpStatus.NO_CONTENT);
		}
		stavkaRacunaRepository.deleteById(id);
		if(id == -100) {
			jdbcTemplate.execute(
					"INSERT INTO \"stavka_racuna\"(\"id\", \"redni_broj\", \"kolicina\", \"jedinica_mere\", \"cena\", \"racun\", \"proizvod\")" 
					+"VALUES(-100, 30,15,'komad', 100, 1,1)");
		}
		return new ResponseEntity<StavkaRacuna>(HttpStatus.OK);
	}
}
