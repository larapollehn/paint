export default interface Gear {
    painting: boolean;

    start(event): void;

    finish(): void;

    draw(color: Color);
}