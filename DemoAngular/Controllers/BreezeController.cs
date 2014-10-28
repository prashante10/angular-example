using System.Linq;
using DemoAngular.Repository;
using Newtonsoft.Json.Linq;
using DemoAngular.Models;
using Breeze.ContextProvider;
using Breeze.WebApi2;
using System.Web.Http;

namespace DemoAngular.Controllers
{
    [BreezeController]
    public class BreezeController : ApiController {
        // Todo: inject via an interface rather than "new" the concrete class
        readonly ProspectRepository _repository = new ProspectRepository();

        [HttpGet]
        public string Metadata() {
            return _repository.Metadata;
        }

        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle) {
            return _repository.SaveChanges(saveBundle);
        }

        [HttpGet]
        public IQueryable<Prospect> Prospects() {
            return _repository.Prospects;
        }

        /// <summary>
        /// Query returing a 1-element array with a lookups object whose 
        /// properties are all Prospects.
        /// </summary>
        /// <returns>
        /// Returns one object, not an IQueryable, 
        /// whose properties are "prospects" and anything more.
        /// The items arrive as arrays.
        /// </returns>
        [HttpGet]
        public object Lookups() {
            var prospects = _repository.Prospects;
            return new { prospects };
        }

        // Diagnostic
        [HttpGet]
        public string Ping() {
            return "pong";
        }
    }
}