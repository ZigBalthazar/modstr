export enum EventClassificationStatus {
  SAFE = "SAFE",
  WARNING = "WARNING",
  HARMFUL = "HARMFUL",
}

export enum EventClassificationLabel {
  OK = "OK",
  INFORMATIVE = "INFORMATIVE",
  FRIENDLY = "FRIENDLY",
  OFFENSIVE = "OFFENSIVE",
  SPAM = "SPAM",
  MISLEADING = "MISLEADING",
  SENSITIVE = "SENSITIVE",
  TRACKING = "TRACKING",
  PROFANITY = "PROFANITY",
  HATEFUL = "HATEFUL",
  VIOLENT = "VIOLENT",
  SEXUAL = "SEXUAL",
  SELF_HARM = "SELF_HARM",
  DANGEROUS = "DANGEROUS",
  NSFW = "NSFW",
  AI_GENERATED = "AI_GENERATED",
  UNVERIFIED = "UNVERIFIED",
  LANGUAGE_UNKNOWN = "LANGUAGE_UNKNOWN",
}

export enum BlobClassificationStatus {
  SAFE = "SAFE",
  WARNING = "WARNING",
  HARMFUL = "HARMFUL",
}

export enum BlobClassificationLabel {
  NSFW = "nsfw",
  NUDITY = "nudity",
  VIOLENCE = "violence",
  GORE = "gore",
  HATE = "hate",
  MISINFORMATION = "misinformation",
  SPAM = "spam",
  TRACKING = "tracking",
  CLICKBAIT = "clickbait",
  MALICIOUS = "malicious",
  MANIPULATED = "manipulated",
  SAFE = "safe",
  EDUCATIONAL = "educational",
  ART = "art",
  MUSIC = "music",
  HUMOR = "humor",
}

export enum BlobSupportedMimeTypes {
  APPLICATION_PDF = "application/pdf",
  AUDIO_MPEG = "audio/mpeg",
  AUDIO_MP3 = "audio/mp3",
  AUDIO_WAV = "audio/wav",
  IMAGE_PNG = "image/png",
  IMAGE_JPEG = "image/jpeg",
  IMAGE_WEBP = "image/webp",
  TEXT_PLAIN = "text/plain",
  VIDEO_MOV = "video/mov",
  VIDEO_MPEG = "video/mpeg",
  VIDEO_MP4 = "video/mp4",
  VIDEO_MPG = "video/mpg",
  VIDEO_AVI = "video/avi",
  VIDEO_WMV = "video/wmv",
  VIDEO_MPEGPS = "video/mpegps",
  VIDEO_FLV = "video/flv",
}
