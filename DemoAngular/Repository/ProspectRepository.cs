using System;
using System.Collections.Generic;
using System.Linq;
using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using System.Web;
using Newtonsoft.Json.Linq;
using DemoAngular.Models;

namespace DemoAngular.Repository {
    public class ProspectRepository {
        private readonly EFContextProvider<ApplicationDbContext>
            _contextProvider = new EFContextProvider<ApplicationDbContext>();

        private ApplicationDbContext Context { get { return _contextProvider.Context; } }

        public string Metadata {
            get { return _contextProvider.Metadata(); }
        }

        public SaveResult SaveChanges(JObject saveBundle) {
            return _contextProvider.SaveChanges(saveBundle);
        }

        public IQueryable<Prospect> Prospects {
            get { return Context.Prospects; }
        }
    }
}