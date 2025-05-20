using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace netflix_eco_back.Migrations
{
    /// <inheritdoc />
    public partial class nextepisode : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "air_date",
                table: "Series");

            migrationBuilder.DropColumn(
                name: "episode_number",
                table: "Series");

            migrationBuilder.DropColumn(
                name: "season_number",
                table: "Series");

            migrationBuilder.AddColumn<int>(
                name: "NextEpisodeToAirId",
                table: "Series",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "NextEpisode",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AirDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EpisodeNumber = table.Column<int>(type: "int", nullable: false),
                    SeasonNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NextEpisode", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Series_NextEpisodeToAirId",
                table: "Series",
                column: "NextEpisodeToAirId");

            migrationBuilder.AddForeignKey(
                name: "FK_Series_NextEpisode_NextEpisodeToAirId",
                table: "Series",
                column: "NextEpisodeToAirId",
                principalTable: "NextEpisode",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Series_NextEpisode_NextEpisodeToAirId",
                table: "Series");

            migrationBuilder.DropTable(
                name: "NextEpisode");

            migrationBuilder.DropIndex(
                name: "IX_Series_NextEpisodeToAirId",
                table: "Series");

            migrationBuilder.DropColumn(
                name: "NextEpisodeToAirId",
                table: "Series");

            migrationBuilder.AddColumn<string>(
                name: "air_date",
                table: "Series",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "episode_number",
                table: "Series",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "season_number",
                table: "Series",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
