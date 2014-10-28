namespace DemoAngular.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProspectAdded : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Prospects",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Notes = c.String(),
                        Closed = c.Boolean(nullable: false),
                        Type = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Prospects");
        }
    }
}
