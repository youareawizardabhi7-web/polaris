declare module 'mp4box' {
  export interface MP4MediaTrack {
    id: number;
    created: Date;
    modified: Date;
    movie_duration: number;
    layer: number;
    alternate_group: number;
    volume: number;
    track_width: number;
    track_height: number;
    timescale: number;
    duration: number;
    codec: string;
    language: string;
    nb_samples: number;
    video?: {
      width: number;
      height: number;
    };
  }

  export interface MP4Info {
    duration: number;
    timescale: number;
    isFragmented: boolean;
    isProgressive: boolean;
    hasIOD: boolean;
    tracks: MP4MediaTrack[];
  }

  export interface MP4Sample {
    track_id: number;
    description: any;
    is_sync: boolean;
    has_redundancy: boolean;
    is_leading: number;
    depends_on: number;
    is_depended_on: number;
    cts: number;
    dts: number;
    duration: number;
    timescale?: number;
    size: number;
    data: Uint8Array;
    offset: number;
  }

  export interface MP4File {
    onReady?: (info: MP4Info) => void;
    onError?: (e: string) => void;
    onSamples?: (id: number, user: any, samples: MP4Sample[]) => void;
    appendBuffer(buffer: ArrayBuffer & { fileStart?: number }): number;
    start(): void;
    stop(): void;
    flush(): void;
    setExtractionOptions(id: number, user?: any, options?: { nbSamples?: number; rapAlignment?: boolean }): void;
  }

  export function createFile(): MP4File;
}
