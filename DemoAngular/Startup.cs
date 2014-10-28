using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(DemoAngular.Startup))]
namespace DemoAngular
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
