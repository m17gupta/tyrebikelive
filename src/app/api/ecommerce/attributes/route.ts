import { getTenantDb } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getTenantDb();
    const attributeColl = db.collection("attribute_sets");
    const attributes = await attributeColl.find({}).toArray();

    if (attributes.length === 0) {
      return NextResponse.json({ data: [], message: "No attributes found" });
    }

    return NextResponse.json({
      data: attributes,
      message: "Attributes fetched successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attributes", status: 500 },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Attribute ID is required" },
        { status: 400 },
      );
    }

    const db = await getTenantDb();
    const attributeColl = db.collection("attribute_sets");
    const attributes = await attributeColl.updateOne(
      { _id: new ObjectId(id) },
      { $set: body },
    );

    if (attributes.modifiedCount === 0) {
      return NextResponse.json({ data: [], message: "No attributes found" });
    }

    return NextResponse.json({
      data: { ...body, _id: id },
      message: "Attributes updated successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update attributes", status: 500 },
      { status: 500 },
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getTenantDb();
    const attributeColl = db.collection("attribute_sets");
    const result = await attributeColl.insertOne(body);

    return NextResponse.json({
      data: { ...body, _id: result.insertedId },
      message: "Attribute set created successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create attribute set", status: 500 },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Attribute ID is required" },
        { status: 400 },
      );
    }

    const db = await getTenantDb();
    const attributeColl = db.collection("attribute_sets");
    const result = await attributeColl.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Attribute set not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Attribute set deleted successfully",
      data: id,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete attribute set", status: 500 },
      { status: 500 },
    );
  }
}
