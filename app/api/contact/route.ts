import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { formData, cartItems } = body;
  
  let emailHtml = `
  <h3>Order Details</h3>
  <p><strong>Name:</strong> ${formData.name}</p>
  <p><strong>Email:</strong> ${formData.email}</p>
  <p><strong>Phone:</strong> ${formData.phone}</p>
  <p><strong>Address:</strong> ${formData.adress}</p>
 =============================================
`;
  if (cartItems && cartItems.length > 0) {
    const totalQuantity = cartItems.reduce(
      (sum: number, item: { quantityInCart: number }) =>
        sum + item.quantityInCart,
      0
    );

    const totalPrice = cartItems.reduce(
      (sum: number, item: { quantityInCart: number; price: number }) =>
        sum + item.quantityInCart * Number(item.price),
      0
    );

    // Construct the cart items section for each book
    const cartItemsHtml = cartItems
      .map(
        (item: {
          title: string;
          auther: string;
          quantityInCart: number;
          price: string;
        }) => {
          const itemTotalPrice = item.quantityInCart * Number(item.price);
          return `
        <p><strong>Title:</strong> ${item.title}</p>
        <p><strong>Author:</strong> ${item.auther}</p>
        <p><strong>Quantity:</strong> ${item.quantityInCart}</p>
        <p><strong>Price per Unit:</strong> ${item.price} DA</p>
        <p><strong>Total for this Item:</strong> ${itemTotalPrice} DA</p>
        ***********************************************************
      `;
        }
      )
      .join("");
    // Construct the full email content
    emailHtml += `
      ${cartItemsHtml}
      <p><strong>Total Quantity of Books:</strong> ${totalQuantity}</p>
      <p><strong>Total Price for All Books:</strong> ${totalPrice} DA</p>
    `;
  }

  try {
    // Send email
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "chogueuramine@gmail.com",
      subject: "Message from Ghiz Read web site",
      html: emailHtml,
    });

    return NextResponse.json({
      message: "Email sent successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "Email sending failed", error: error.message },
      { status: 500 }
    );
  }
}
