export class SearchBookDto {
    readonly name: string;
    readonly id: number;
    readonly googleId: string;
    readonly etag: string;
    readonly selfLink: string;
    readonly author:string
    readonly isBorrowed: boolean;
}