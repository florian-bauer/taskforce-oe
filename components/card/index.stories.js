import { Card as CardComponent } from "@/components/card";

export default {
    title: "Card",
    component: CardComponent,
};

const Template = (args) => <CardComponent {...args} />;

const _args = {
    title: "Kaffeekasse für alle Mitarbeiter",
    description:
        "Alle kennen es, man will kostenlosen Kaffee haben. Ich bin dafür dass dies nun von allen Kaffeetrinkern in angriff genommen wird. Hierfür würde alle Kaffeetrinker in eine kleine Kasse einzahlen.",
    name: "Florian Bauer",
    avatar:
        "https://lh3.googleusercontent.com/fife/ABSRlIr_zeJVYKD3OpUctp8FcT8Mf3t2EH2UXCEHvXYwk6u8k-_L_EbIc8hH_symaKI0TdIVq1z18ujRvGoTLcWotlXYxHi4l81lS9FrjhZkOUhClCiwNw0hdYCM6LlEL3KuQc1xH7Vg1YejrNWpsB4liVKjmDR6D-QvnXGDj9Ba_c0C6VJK4POrqibkAkZMclQ3rDxDL1SLLkQaYrw7VSoTFtTwvi7bHJLR0hQSp0iBPcpeAKsN0gNz0SljGBpxff3j7X449GLqBop7FC67pMgDgtJj-Y6evFweKUNhVC71bnijxvnj_1Uk10raxGwGBx5wATXTMZQcHd2LKqE8jBBKEUBSQtrmVvRtkChrybUFXUUgOdeJCdHwvUyh29uKo7AEipUiFqlZu_t0u0t5HfvanYFhyIElyuc1rbfMXpLPw5MKu70EKG3NqO9Ven6Vmy58i1SynpRPqNHaoJtWlTBovcAkZ5ryAnJPDVVIZNwRE20DGLuXS4IQCPIj8oeb6SiwHp_FeNb0YH6DbjEUUPN119MvZ3gzntMavqGG2Jfq7UtgSIznIMtiy0dy_F5ORQ2rOnL3OHfJhc2XKmp-TM-dM0VD4WWDJiNGhDb07j2I8QHKKUL70IfF5AqsYg8d_rQs6bhMD0KdtDNadPBwcfVyIARYfQ_UFUXX6HvmWUD5Tm9nblzSV5dU2mdsldPi7nQmDph8LTtd6WGODD6vi9n5YvSBW1RDQoQEygRBdxJrePtJk9M=s83-c",
    participants: [
        {
            name: "Ki-Adi Mundi",
            avatar: "",
        },
        {
            name: "Anakin Skywalker",
            avatar: "",
        },
        {
            name: "Mace Windu",
            avatar: "",
        },
    ],
    is: {
        owner: true,
        administrator: true,
    },
};

export const Voting = Template.bind({});
Voting.args = {
    ..._args,
    status: "voting",
};

export const Progress = Template.bind({});
Progress.args = {
    ..._args,
    status: "progress",
};

export const Finished = Template.bind({});
Finished.args = {
    ..._args,
    status: "finished",
};

export const Deleted = Template.bind({});
Deleted.args = {
    ..._args,
    status: "deleted",
};