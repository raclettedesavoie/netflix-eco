using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class SerieBase
{
    [Key]
    public int Id { get; set; }  // clé primaire auto-incrémentée

    public int SerieId { get; set; }

    public string Name { get; set; } = string.Empty;

    [JsonPropertyName("first_air_date")]
    public DateTime FirstAirDate { get; set; }

    [JsonPropertyName("poster_path")]
    public string? PosterPath { get; set; }

    [JsonPropertyName("next_episode_to_air")]
    public NextEpisode? NextEpisodeToAir { get; set; }

    public string Overview { get; set; } = string.Empty;

    [JsonPropertyName("original_language")]
    public string OriginalLanguage { get; set; } = string.Empty;

    [JsonPropertyName("apiRef")]
    public string? ApiRef { get; set; }

    public string Type { get; set; } = string.Empty;
}

public class NextEpisode
{
    [Key]
    public int Id { get; set; }
    [JsonPropertyName("next_episode_id")]
    public int NextEpisodeId { get; set; }

    [JsonPropertyName("air_date")]
    public DateTime AirDate { get; set; }

    [JsonPropertyName("episode_number")]
    public int EpisodeNumber { get; set; }

    [JsonPropertyName("season_number")]
    public int SeasonNumber { get; set; }
}
