import { useOptions } from "@/hooks";

it("outputs correctly", () => {
    const definite = "b";
    const options = [
        { is: "a", be: 1 },
        { is: "b", be: 2 },
        { is: "c", be: 3 },
        { is: "d", be: 4 },
    ];

    const output = useOptions(definite, options);

    expect(output).toBe(2);
});
