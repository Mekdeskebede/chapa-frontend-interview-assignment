import { NextResponse } from "next/server";

export async function GET() {
    // Mock customer data
    const customerData = {
        name: "Mekdes Kebede",
        email: "mekdes.kebede@gmail.com",
        phone: "+251 911 234 567",
        location: "Addis Ababa, Ethiopia",
        avatar: "https://media.licdn.com/dms/image/v2/D4E03AQF5XF2gsKmx2A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1724700757256?e=1757548800&v=beta&t=SkVG6xVYXEzGjhTYucrQfgl3SPUZPOachjRhGlBIfgQ",
    };
    return NextResponse.json(customerData);
}
