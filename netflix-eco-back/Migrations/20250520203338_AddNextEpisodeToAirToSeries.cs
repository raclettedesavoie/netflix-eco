using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace netflix_eco_back.Migrations
{
    /// <inheritdoc />
    public partial class AddNextEpisodeToAirToSeries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Series_NextEpisodes_NextEpisodeToAirId",
                table: "Series");

            migrationBuilder.DropTable(
                name: "NextEpisodes");

            migrationBuilder.DropIndex(
                name: "IX_Series_NextEpisodeToAirId",
                table: "Series");

            migrationBuilder.RenameColumn(
                name: "NextEpisodeToAirId",
                table: "Series",
                newName: "NextEpisodeToAir_SeasonNumber");

            migrationBuilder.AddColumn<DateTime>(
                name: "NextEpisodeToAir_AirDate",
                table: "Series",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NextEpisodeToAir_EpisodeNumber",
                table: "Series",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NextEpisodeToAir_NextEpisodeId",
                table: "Series",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextEpisodeToAir_AirDate",
                table: "Series");

            migrationBuilder.DropColumn(
                name: "NextEpisodeToAir_EpisodeNumber",
                table: "Series");

            migrationBuilder.DropColumn(
                name: "NextEpisodeToAir_NextEpisodeId",
                table: "Series");

            migrationBuilder.RenameColumn(
                name: "NextEpisodeToAir_SeasonNumber",
                table: "Series",
                newName: "NextEpisodeToAirId");

            migrationBuilder.CreateTable(
                name: "NextEpisodes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AirDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EpisodeNumber = table.Column<int>(type: "int", nullable: false),
                    NextEpisodeId = table.Column<int>(type: "int", nullable: false),
                    SeasonNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NextEpisodes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Series_NextEpisodeToAirId",
                table: "Series",
                column: "NextEpisodeToAirId");

            migrationBuilder.AddForeignKey(
                name: "FK_Series_NextEpisodes_NextEpisodeToAirId",
                table: "Series",
                column: "NextEpisodeToAirId",
                principalTable: "NextEpisodes",
                principalColumn: "Id");
        }
    }
}
