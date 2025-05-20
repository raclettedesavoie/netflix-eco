using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace netflix_eco_back.Migrations
{
    /// <inheritdoc />
    public partial class nextepissodeseza : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Series_NextEpisode_NextEpisodeToAirId",
                table: "Series");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NextEpisode",
                table: "NextEpisode");

            migrationBuilder.RenameTable(
                name: "NextEpisode",
                newName: "NextEpisodes");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NextEpisodes",
                table: "NextEpisodes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Series_NextEpisodes_NextEpisodeToAirId",
                table: "Series",
                column: "NextEpisodeToAirId",
                principalTable: "NextEpisodes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Series_NextEpisodes_NextEpisodeToAirId",
                table: "Series");

            migrationBuilder.DropPrimaryKey(
                name: "PK_NextEpisodes",
                table: "NextEpisodes");

            migrationBuilder.RenameTable(
                name: "NextEpisodes",
                newName: "NextEpisode");

            migrationBuilder.AddPrimaryKey(
                name: "PK_NextEpisode",
                table: "NextEpisode",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Series_NextEpisode_NextEpisodeToAirId",
                table: "Series",
                column: "NextEpisodeToAirId",
                principalTable: "NextEpisode",
                principalColumn: "Id");
        }
    }
}
