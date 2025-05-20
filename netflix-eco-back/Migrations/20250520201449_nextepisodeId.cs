using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace netflix_eco_back.Migrations
{
    /// <inheritdoc />
    public partial class nextepisodeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NextEpisodeId",
                table: "NextEpisode",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextEpisodeId",
                table: "NextEpisode");
        }
    }
}
